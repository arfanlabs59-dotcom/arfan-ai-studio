-- ARFAN AI HUB final hardening add-on
-- Run AFTER supabase/schema.sql

create or replace function public.get_credit_history(p_telegram_id bigint, p_limit int default 20)
returns table(tx_type text, amount bigint, reference_id text, created_at timestamptz)
language sql stable security definer set search_path=public
as $$
  select tx_type, amount, reference_id, created_at
  from public.ai_credit_transactions
  where telegram_id=p_telegram_id
  order by created_at desc
  limit greatest(1, least(coalesce(p_limit,20),100));
$$;

create or replace function public.claim_ai_daily_bonus(p_telegram_id bigint)
returns jsonb
language plpgsql security definer set search_path=public
as $$
declare v_ref text := to_char(current_date,'YYYY-MM-DD'); v_amount bigint := 5; v_event int;
begin
  insert into public.users(telegram_id) values(p_telegram_id) on conflict do nothing;
  insert into public.credit_events(telegram_id,event_type,reference_id,amount,metadata)
  values(p_telegram_id,'daily_bonus',v_ref,v_amount,'{}'::jsonb)
  on conflict (telegram_id,event_type,reference_id) do nothing;
  get diagnostics v_event = row_count;
  if v_event=1 then
    return public._grant_credit_internal(p_telegram_id,v_amount,'bonus','daily_bonus:'||v_ref,'daily_bonus',null,'{}'::jsonb)
           || jsonb_build_object('granted',true);
  end if;
  return jsonb_build_object('ok',true,'granted',false,'reason','already_claimed',
    'balance',public.get_credit_balance(p_telegram_id));
end;
$$;

create or replace function public.grant_system_credit(p_telegram_id bigint,p_event_type text,p_reference_id text,p_amount bigint,p_source text default 'system')
returns jsonb language plpgsql security definer set search_path=public
as $$
declare v_event int;
begin
  if p_amount<=0 then raise exception 'invalid credit amount'; end if;
  insert into public.credit_events(telegram_id,event_type,reference_id,amount,metadata)
  values(p_telegram_id,p_event_type,p_reference_id,p_amount,jsonb_build_object('source',p_source))
  on conflict (telegram_id,event_type,reference_id) do nothing;
  get diagnostics v_event=row_count;
  if v_event=0 then return jsonb_build_object('ok',true,'granted',false,'reason','duplicate'); end if;
  return public._grant_credit_internal(p_telegram_id,p_amount,'promo',p_event_type||':'||p_reference_id,p_source,null,'{}'::jsonb)
         || jsonb_build_object('granted',true);
end;
$$;

create or replace function public.admin_grant_credit(p_admin_id bigint,p_telegram_id bigint,p_amount bigint,p_reference_id text,p_note text default null)
returns jsonb language plpgsql security definer set search_path=public
as $$
declare v jsonb;
begin
  if not public.is_admin(p_admin_id) then raise exception 'admin only'; end if;
  v:=public._grant_credit_internal(p_telegram_id,p_amount,'admin_grant',p_reference_id,'admin',null,jsonb_build_object('note',p_note));
  insert into public.admin_logs(admin_id,action,target_id,metadata)
  values(p_admin_id,'credit_grant',p_telegram_id::text,jsonb_build_object('amount',p_amount,'reference_id',p_reference_id,'note',p_note));
  return v || jsonb_build_object('ok',true);
end;
$$;

create or replace function public.mark_ai_request_processing(p_request_uuid uuid,p_provider_job_id text default null)
returns jsonb language plpgsql security definer set search_path=public
as $$
declare v_status text;
begin
  select status into v_status from public.ai_requests where id=p_request_uuid for update;
  if v_status is null then raise exception 'request not found'; end if;
  if v_status='processing' then return jsonb_build_object('ok',true,'status','processing'); end if;
  if v_status<>'reserved' then raise exception 'invalid request state'; end if;
  update public.ai_requests set status='processing',provider_job_id=coalesce(p_provider_job_id,provider_job_id),updated_at=now() where id=p_request_uuid;
  return jsonb_build_object('ok',true,'status','processing');
end;
$$;

create or replace function public.approve_withdrawal(p_admin_id bigint,p_withdrawal_id uuid)
returns jsonb language plpgsql security definer set search_path=public
as $$
declare v public.withdrawals%rowtype;
begin
  if not public.is_admin(p_admin_id) then raise exception 'admin only'; end if;
  select * into v from public.withdrawals where id=p_withdrawal_id for update;
  if not found then raise exception 'withdrawal not found'; end if;
  if v.status='approved' or v.status='paid' then return jsonb_build_object('ok',true,'status',v.status); end if;
  if v.status<>'pending' then raise exception 'invalid withdrawal state'; end if;
  update public.withdrawals set status='approved',updated_at=now() where id=p_withdrawal_id;
  insert into public.admin_logs(admin_id,action,target_id,metadata) values(p_admin_id,'withdrawal_approved',p_withdrawal_id::text,'{}'::jsonb);
  return jsonb_build_object('ok',true,'status','approved');
end;
$$;

create or replace function public.reject_withdrawal(p_admin_id bigint,p_withdrawal_id uuid,p_reason text default null)
returns jsonb language plpgsql security definer set search_path=public
as $$
declare v public.withdrawals%rowtype;
begin
  if not public.is_admin(p_admin_id) then raise exception 'admin only'; end if;
  select * into v from public.withdrawals where id=p_withdrawal_id for update;
  if not found then raise exception 'withdrawal not found'; end if;
  if v.status='rejected' then return jsonb_build_object('ok',true,'status','rejected'); end if;
  if v.status not in ('pending','approved') then raise exception 'invalid withdrawal state'; end if;
  update public.users set balance=balance+v.amount,updated_at=now() where telegram_id=v.telegram_id;
  insert into public.wallet_transactions(telegram_id,tx_type,amount,reference_id)
  values(v.telegram_id,'refund',v.amount,'withdrawal_refund:'||p_withdrawal_id::text)
  on conflict do nothing;
  update public.withdrawals set status='rejected',updated_at=now() where id=p_withdrawal_id;
  insert into public.admin_logs(admin_id,action,target_id,metadata) values(p_admin_id,'withdrawal_rejected',p_withdrawal_id::text,jsonb_build_object('reason',p_reason));
  return jsonb_build_object('ok',true,'status','rejected');
end;
$$;

create or replace function public.mark_withdrawal_paid(p_admin_id bigint,p_withdrawal_id uuid,p_payout_reference text default null)
returns jsonb language plpgsql security definer set search_path=public
as $$
declare v public.withdrawals%rowtype;
begin
  if not public.is_admin(p_admin_id) then raise exception 'admin only'; end if;
  select * into v from public.withdrawals where id=p_withdrawal_id for update;
  if not found then raise exception 'withdrawal not found'; end if;
  if v.status='paid' then return jsonb_build_object('ok',true,'status','paid'); end if;
  if v.status<>'approved' then raise exception 'withdrawal must be approved first'; end if;
  update public.withdrawals set status='paid',payout_reference=p_payout_reference,updated_at=now() where id=p_withdrawal_id;
  insert into public.admin_logs(admin_id,action,target_id,metadata) values(p_admin_id,'withdrawal_paid',p_withdrawal_id::text,jsonb_build_object('payout_reference',p_payout_reference));
  return jsonb_build_object('ok',true,'status','paid');
end;
$$;

create or replace function public.get_wallet_history(p_telegram_id bigint,p_limit int default 20)
returns table(tx_type text,amount bigint,reference_id text,created_at timestamptz)
language sql stable security definer set search_path=public
as $$
  select tx_type,amount,reference_id,created_at from public.wallet_transactions
  where telegram_id=p_telegram_id order by created_at desc
  limit greatest(1,least(coalesce(p_limit,20),100));
$$;

create or replace function public.record_ai_usage_revenue(p_request_uuid uuid)
returns jsonb language plpgsql security definer set search_path=public
as $$
declare r public.ai_requests%rowtype; rate bigint; rev bigint; ref text;
begin
  select * into r from public.ai_requests where id=p_request_uuid for update;
  if not found then raise exception 'request not found'; end if;
  if r.status<>'succeeded' then raise exception 'request not succeeded'; end if;
  if exists(select 1 from public.admin_credit_revenue where ai_request_id=p_request_uuid) then
    return jsonb_build_object('ok',true,'already_recorded',true);
  end if;
  rate:=coalesce(nullif(current_setting('app.ai_revenue_rate',true), '')::bigint,100);
  if rate not in (50,80,100) then rate:=100; end if;
  rev:=r.credits*rate; ref:='ai_request:'||p_request_uuid::text;
  insert into public.admin_credit_revenue(telegram_id,ai_request_id,credits_used,rate_bdt_per_credit,revenue_bdt,reference_id)
  values(r.telegram_id,p_request_uuid,r.credits,rate,rev,ref);
  insert into public.admin_revenue_ledger(source,reference_id,amount_bdt,settled_amount_bdt,withdrawable_amount_bdt,metadata)
  values('ai_credit_usage',ref,rev,0,0,jsonb_build_object('credits',r.credits,'rate',rate));
  return jsonb_build_object('ok',true,'revenue_bdt',rev,'rate',rate);
end;
$$;

-- Keep read RPCs callable by backend; financial mutation RPCs remain service-role only.
revoke all on function public.get_credit_history(bigint,int) from public,anon,authenticated;
revoke all on function public.claim_ai_daily_bonus(bigint) from public,anon,authenticated;
revoke all on function public.grant_system_credit(bigint,text,text,bigint,text) from public,anon,authenticated;
revoke all on function public.admin_grant_credit(bigint,bigint,bigint,text,text) from public,anon,authenticated;
revoke all on function public.mark_ai_request_processing(uuid,text) from public,anon,authenticated;
revoke all on function public.approve_withdrawal(bigint,uuid) from public,anon,authenticated;
revoke all on function public.reject_withdrawal(bigint,uuid,text) from public,anon,authenticated;
revoke all on function public.mark_withdrawal_paid(bigint,uuid,text) from public,anon,authenticated;
revoke all on function public.record_ai_usage_revenue(uuid) from public,anon,authenticated;
