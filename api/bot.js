export default async function handler(req, res) {
  const BOT_TOKEN = process.env.BOT_TOKEN;
  if (req.method === 'POST') {
    try {
      const msg = req.body.message;
      if (msg) {
        const chatId = msg.chat.id;
        const text = msg.text || "";
        
        let reply = "";
        if (text === "/start") {
          reply = "🔥 ARFAN AI Studio e Welcome!\n\n⭐ All-in-One AI Hub\n✅ Bot is 100% Working!\n\nCommands:\n/start - Start Bot\n/help - Help\n\nEbar kaj korbe mama!";
        } else {
          reply = `Tumi bolso: ${text}\n\nARFAN AI Studio Ready! 🚀`;
        }

        await fet