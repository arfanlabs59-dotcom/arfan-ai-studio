// ARFAN AI STUDIO V22 ULTIMATE LIVE ✅
export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).send('ARFAN AI V22 ULTIMATE LIVE ✅ - 100% FREE - NO CREDIT NEEDED');
  }

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_KEY;

  const body = req.body;
  if (!body.message) return res.status(200).send('ok');

  const chatId = body.message.chat.id;
  const userId = body.message.from.id;
  const username = body.message.from.username || 'user';
  const text = body.message.text || '';

  // Supabase helper
  async function sb(path, method='GET', data=null) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      method,
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: data? JSON.stringify(data) : null
    });
    return r.json();
  }

  async function getUser() {
    let u = await sb(`users?id=eq.${userId}`);
    if (!u || u.length===0) {
      // check referral
      let referBy = null;
      if (text.startsWith('/start ') ) {
        const refId = text.split(' ')[1];
        if (refId && refId!= userId) referBy = refId;
      }
      const newUser = { id: userId, username, credit: 20, referral_bdt: 0, refer_by: referBy };
      await sb('users', 'POST', newUser);
      // give bonus to referrer
      if (referBy) {
        let refUser = await sb(`users?id=eq.${referBy}`);
        if (refUser && refUser[0]) {
          await sb(`users?id=eq.${referBy}`, 'PATCH', { referral_bdt: (refUser[0].referral_bdt||0)+20, credit: (refUser[0].credit||0)+5 });
        }
      }
      return newUser;
    }
    return u[0];
  }

  const user = await getUser();

  async function send(msg, kb=null) {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ chat_id: chatId, text: msg, parse_mode: 'Markdown', reply_markup: kb })
    });
  }

  if (text.startsWith('/start')) {
    await send(`👋 *ARFAN AI V22 ULTIMATE LIVE* 🚀\n✅ 100% FREE - No Credit Needed\n\n💰 Credit: ${user.credit}\n\n💬 /ai diye ja khushi jiga mama!\n\n📌 Commands:\n/wallet - Tomar wallet\n/earn - Taka income koro\n/refer - Refer kore income\n/market - Credit kinte\n/premium - Premium plan\n/help - Sob command`);
  }
  else if (text.startsWith('/wallet')) {
    await send(`💳 *WALLET*\n\n👤 ${username}\n💰 Credit: ${user.credit}\n💵 Referral Income: ${user.referral_bdt} BDT\n👑 VIP: ${user.is_vip? 'Yes' : 'No'}\n📦 Plan: ${user.plan || 'Free'}`);
  }
  else if (text.startsWith('/earn')) {
    await send(`🔥 *EARN SYSTEM*\n\n1️⃣ /refer - Per refer 20 BDT + 5 Credit\n2️⃣ Daily Bonus - Kal asbe\n3️⃣ /ai use koro - unlimited free\n\nTumar referral BDT: ${user.referral_bdt}`);
  }
  else if (text.startsWith('/refer')) {
    const link = `https://t.me/ARFAN_AI_Studio_bot?start=${userId}`;
    await send(`👥 *REFER & EARN*\n\n🔗 Link: \`${link}\`\n\nPer refer paba:\n💵 20 BDT\n💰 5 Credit\n\nTumar total refer income: ${user.referral_bdt} BDT\n\nShare koro ar income koro!`);
  }
  else if (text.startsWith('/market') || text.startsWith('/premium')) {
    await send(`🛒 *MARKET / PREMIUM*\n\n💎 100 Credit = 50 BDT\n👑 VIP Lifetime = 299 BDT\n\nKin te chaile admin ke inbox koro:\n@Arfan_Islam\n\nBkash/Nagad: 017...`);
  }
  else if (text.startsWith('/help')) {
    await send(`📖 *HELP*\n\n/ai + proshno - AI ke jiga\n/wallet - Wallet check\n/earn - Income system\n/refer - Refer link\n/market - Credit buy\n/premium - VIP kinte`);
  }
  else if (text.startsWith('/ai') || text.startsWith('/aihub')) {
    const q = text.replace(/\/aihub|\/ai/, '').trim();
    if (!q) { await send('❓ Likho: /ai tomar proshno'); }
    else {
      // Simple AI reply for now (free)
      await send(`🤖 *ARFAN AI V22:*\n\nTomar proshno: ${q}\n\nAnswer: Eta V22 ULTIMATE er free AI response! Tumi ja khushi jiga korte paro mama, ami always ready! 🚀\n\nAro detail jante abar /ai diye jiga.`);
      // Deduct 1 credit
      if ((user.credit||0) > 0) {
        await sb(`users?id=eq.${userId}`, 'PATCH', { credit: user.credit - 1 });
      }
    }
  }
  else {
    // Auto AI for any message
    if (text.length > 1) {
      await send(`🤖 ${text} niye bolcho? /ai diye jiga koro mama, full answer dibo! 🚀`);
    }
  }

  return res.status(200).send('ok');
}