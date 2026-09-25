export default async function handler(req, res) {
  if (req.method === 'GET') return res.status(200).send('V14.1 Fixed ✅');
  const BOT_TOKEN = process.env.BOT_TOKEN;
  const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
  const msg = req.body?.message;
  if (!msg?.text) return res.status(200).send('ok');
  const chatId = msg.chat.id;
  const text = msg.text.trim();

  if (text.startsWith('/start')) {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST', headers: {'Content-Type':'application/json'},
      body: JSON.stringify({chat_id: chatId, text: `🔥 ARFAN AI V14.1 LIVE\n\n/ai likhe ja khushi bol mama!`})
    });
    return res.status(200).send('ok');
  }

  if (text.toLowerCase().startsWith('/ai')) {
    let prompt = text.slice(3).trim();
    if(!prompt) prompt = "hi";
    try {
      const aiRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://arfan-ai-studio.vercel.app',
          'X-Title': 'ARFAN AI'
        },
        body: JSON.stringify({
          model: 'google/gemma-2-9b-it:free',
          messages: [{role: 'user', content: prompt}]
        })
      });
      const data = await aiRes.json();
      let reply = data.choices?.[0]?.message?.content || `Error: ${JSON.stringify(data).slice(0,200)}`;
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({chat_id: chatId, text: reply})
      });
    } catch(e){
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({chat_id: chatId, text: `Error: ${e.message}`})
      });
    }
    return res.status(200).send('ok');
  }
  return res.status(200).send('ok');
}