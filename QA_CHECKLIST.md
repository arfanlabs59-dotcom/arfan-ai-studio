# Production QA Gate

## Payment
- [ ] Plan amount comes from DB, never Telegram input.
- [ ] TRX required.
- [ ] Screenshot required.
- [ ] Telegram ID auto-captured.
- [ ] TRX normalized.
- [ ] Duplicate TRX rejected.
- [ ] Support evidence stored privately.
- [ ] Bot/support mismatch cannot be verified.
- [ ] Only admin can verify.
- [ ] Verify is idempotent.
- [ ] Credits granted once.
- [ ] Lifetime Active set once.
- [ ] Reject grants no credits.

## Credits
- [ ] Insufficient credits blocked.
- [ ] AI request reserves exact catalog cost.
- [ ] Duplicate request blocked.
- [ ] Provider failure refunds once.
- [ ] Successful request cannot be refunded by failure path.
- [ ] AI credits cannot enter BDT wallet.

## Wallet
- [ ] Minimum withdrawal 500.
- [ ] Balance reserved exactly once.
- [ ] Reject refunds exactly once.
- [ ] Paid does not deduct again.

## Security
- [ ] No secrets in Git.
- [ ] Webhook secret checked.
- [ ] Service-role key server-side only.
- [ ] Mutation RPCs revoked from public/anon/authenticated.
- [ ] Screenshots not public.
- [ ] Admin checks inside RPCs.

## Provider
- [ ] Every provider key valid.
- [ ] Every current endpoint/model verified from official docs.
- [ ] Async jobs have polling/webhook handling.
- [ ] Telegram delivery retry implemented.
