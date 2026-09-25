export default async function handler(req, res) {
  if (req.method === 'GET') return res.status(200).send('V17 FINAL ✅ - READY');

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const OR_KEY = process.env.OPENROUTER_API_KEY;

  try {
    const msg = req.body?.message;
    if (!msg?.text) return res.status(200).send('ok');

    const chatId = msg.chat.id;
    const text = msg.text.trim();

    if (text.startsWith('/start')) {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ chat_id: chatId, text: '👑 ARFAN AI V17 LIVE 🚀\n\n/ai diye ja khushi jiga mama!' })
      });
      return res.status(200).send('ok');
    }

    if (text.toLowerCase().startsWith('/ai')) {
      let prompt = text.slice(3).trim();
      if (!prompt) prompt = 'hi';

      if (!OR_KEY) {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST', headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ chat_id: chatId, text: '❌ OPENROUTER_API_KEY pai nai Vercel e! Settings > Env Vars e add koro mama' })
        });
        return res.status(200).send('ok');
      }

      const orRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OR_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://arfan-ai-studio.vercel.app',
          'X-Title': 'ARFAN AI'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.2-3b-instruct:free',
          messages: [{ role: 'user', content: prompt }]
        })
      });

      const data = await orRes.json();

      if (!orRes.ok) {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST', headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ chat_id: chatId, text: `OpenRouter Error ${orRes.status}: ${JSON.stringify(data).slice(0,800)}` })
        });
        return res.status(200).send('ok');
      }

      const reply = data.choices?.[0]?.message?.content || 'Reply empty!';

      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ chat_id: chatId, text: reply })
      });
      return res.status(200).send('ok');
    }

    return res.status(200).send('ok');
  } catch (e) {
    console.error(e);
    return res.status(200).send('ok');
  }
}