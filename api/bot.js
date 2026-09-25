export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).send('V17 FIXED ✅ - READY');
  }

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const OR_KEY = process.env.OPENROUTER_API_KEY;
  const m = req.body?.message;
  if (!m) return res.status(200).send('ok');

  const chatId = m.chat.id;
  const text = m.text || '';
  const send = async (t) => {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: t, parse_mode: 'HTML' })
    });
  };

  if (text === '/start') {
    await send('👋 <b>ARFAN AI V17 LIVE</b> 🚀\n\n🤖 OpenRouter Connected\n💬 /ai likhe ja khushi bol!');
    return res.status(200).send('ok');
  }

  if (text.toLowerCase().startsWith('/ai')) {
    let prompt = text.replace('/ai', '').trim();
    if (!prompt) prompt = 'hi';
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendChatAction`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, action: 'typing' })
    });
    try {
      const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OR_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://arfan-ai-studio.vercel.app',
          'X-Title': 'Arfan Labs'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.2-3b-instruct:free',
          messages: [{ role: 'user', content: prompt }]
        })
      });
      const d = await r.json();
      if (!r.ok) {
        await send(`❌ OpenRouter Error ${r.status}: ${JSON.stringify(d).slice(0,600)}`);
        return res.status(200).send('ok');
      }
      const reply = d.choices?.[0]?.message?.content || 'AI reply empty!';
      await send(`🤖 ${reply}`);
    } catch (e) {
      await send(`❌ AI Error: ${e.message}`);
    }
  }
  return res.status(200).send('ok');
}