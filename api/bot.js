export default async function handler(req, res) {
  if (req.method === 'GET') return res.status(200).send('V20 FREE FOREVER ✅ - NO CREDIT NEEDED');

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const m = req.body?.message;
  if (!m) return res.status(200).send('ok');

  const chatId = m.chat.id;
  const text = m.text || '';

  const send = async (t) => {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: t, parse_mode: 'HTML' })
    });
  };

  if (text === '/start') {
    await send('👋 <b>ARFAN AI V20 LIVE</b> 🚀\n✅ 100% FREE - No Credit Needed\n💬 /ai diye ja khushi jiga mama!');
    return res.status(200).send('ok');
  }

  if (text.toLowerCase().startsWith('/ai')) {
    let prompt = text.slice(3).trim();
    if (!prompt) prompt = 'hi mama kemon acho? banglay bolo';

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendChatAction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, action: 'typing' })
    });

    try {
      // 100% FREE AI - Pollinations
      const r = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}?model=openai&system=You are Arfan AI, a friendly Bengali assistant. Reply in Bangla mixed with English like mama style. Be helpful and fun.`);
      const reply = await r.text();
      
      if (reply) {
        await send(`🤖 ${reply.slice(0, 3500)}`);
      } else {
        await send('❌ Reply pai nai mama, abar try koro!');
      }
    } catch (e) {
      await send(`❌ Error: ${e.message}`);
    }
  }
  return res.status(200).send('ok');
}