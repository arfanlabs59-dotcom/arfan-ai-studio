export default async function handler(req, res) {
  const BOT_TOKEN = process.env.BOT_TOKEN;
  const ADMIN_ID = 6386740978;
  const SUPPORT_TELE = "@Arfanvai11";
  const SUPPORT_WA = "01316963411";

  if (req.method!== 'POST') return res.status(200).send('V13.6 24/7 Active');

  const update = req.body;
  const msg = update.message;
  if (!msg ||!msg.text) return res.status(200).send('ok');

  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = msg.text.trim();
  const args = text.split(' ');
  const cmd = args[0].toLowerCase();

  async function send(text) {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: text, parse_mode: 'HTML', disable_web_page_preview: true })
    });
  }

  const supportMsg = `🆘 <b>SUPPORT CENTER - 24/7</b>\n\n💬 Telegram: ${SUPPORT_TELE} (Fast 5 min)\n📱 WhatsApp: ${SUPPORT_WA}\n🔗 https://wa.me/8801316963411\n\n⏰ Active: 24/7 - 7 Days / 24 Hours\n⚡ Reply: 5-10 min\n🤖 Bot: 24/7 Auto\n👑 Admin: ${ADMIN_ID}`;

  // MAIN MENU
  if (cmd === '/start') {
    return await send(`👑 <b>ARFAN AI STUDIO V13.6 - 24/7</b>\n\n💎 0cr | 0৳\n📦 free | Active: false\n\n🚀 AI (8cr):\n/ask - Chat\n/write - Article\n/image - Image\n\n💰 /daily - 30cr Pending\n💰 Refer: https://t.me/ArfanAIBot?start=${userId}\nRefer = 50৳+50cr Pending\n\n🛒 /buy - Buy plan\n💸 /withdraw - Min 300৳\n\n🆘 SUPPORT 24/7:\n💬 Telegram: ${SUPPORT_TELE}\n📱 WhatsApp: ${SUPPORT_WA}\n🔗 https://wa.me/8801316963411\n⏰ Active: 24/7`);
  }

  if (cmd === '/help') return await send(supportMsg);
  if (cmd === '/support') return await send(supportMsg);

  // FIXED ALL MISSING COMMANDS
  if (cmd === '/aihub') return await send(`🤖 <b>AI HUB - V13.6</b>\n\n/ask - AI Chat (8cr)\n/write - Article Write (10cr)\n/image - Image Gen (15cr)\n\n${supportMsg}`);

  if (cmd === '/earn') return await send(`💰 <b>EARN CENTER</b>\n\n/daily - Daily 30cr Pending\nRefer - 50৳ + 50cr Pending per refer\n\nRefer Link: https://t.me/ArfanAIBot?start=${userId}\n\nMin Withdraw 300৳\n${supportMsg}`);

  if (cmd === '/wallet') return await send(`💎 <b>WALLET</b>\n\n💎 Credit: 0cr\n💵 Balance: 0৳\n📦 Plan: free\n\nUse /daily for pending credit\n${supportMsg}`);

  if (cmd === '/refer') return await send(`👥 <b>REFER & EARN</b>\n\nYour Link:\nhttps://t.me/ArfanAIBot?start=${userId}\n\nReward: 50৳ + 50cr (Pending - Admin Approve)\n\nShare & Earn Unlimited!\n${supportMsg}`);

  if (cmd === '/market' || cmd === '/buy' || cmd === '/premium') {
    return await send(`🛒 <b>MARKET / PREMIUM</b>\n\n💎 100cr = 99৳\n💎 500cr = 399৳\n💎 1000cr = 699৳\n👑 Unlimited = 1499৳\n\nBuy korte support e contact koro:\n${supportMsg}`);
  }

  if (cmd === '/profile') return await send(`👤 <b>PROFILE</b>\n\n🆔 ID: ${userId}\n💎 Credit: 0cr\n💵 Balance: 0৳\n📦 Plan: free\n\n${supportMsg}`);

  if (cmd === '/daily') return await send(`⏳ Daily 30cr Pending e geche! Admin approve korle add hobe.\n${supportMsg}`);

  if (cmd.startsWith('/ask') || cmd.startsWith('/write') || cmd.startsWith('/image')) {
    return await send(`🤖 AI er jonno 8cr lagbe! /daily kore pending nao.\n${supportMsg}`);
  }

  // Admin
  if (userId === ADMIN_ID && cmd === '/pending') return await send(`Pending system - Check Vercel logs`);

  return await send(`❓ Command bujhi nai! Menu theke try koro.\n\n${supportMsg}`);

  res.status(200).send('ok');
}