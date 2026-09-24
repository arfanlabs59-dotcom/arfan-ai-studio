export default async function handler(req, res) {
  if (req.method === 'GET') return res.status(200).send('ARFAN AI STUDIO LIVE ✅');
  
  try {
    const token = process.env.BOT_TOKEN;
    const msg = req.body?.message;
    if (!msg) return res.status(200).json({ok:true});

    const chatId = msg.chat.id;
    const text = msg.text || "";

    let replyText = "";
    
    if (text.startsWith("/start")) {
      replyText = `🔥 ARFAN AI Studio e Welcome!\n\n⭐ All-in-One AI Hub\n✅ Bot is 100% Working!\n\n10 AI Tools • Work • Earn • Wallet\n\nCommands:\n/aihub - 10 AI Tools\n/earn - Earn Money\n/wallet - My Wallet\n/refer - Refer & Earn\n/market - Marketplace\n/premium - Go Premium\n\nEbar kaj korbe mama! 🚀`;
    } else if (text.startsWith("/aihub")) {
      replyText = `🤖 ARFAN AI Hub - 10 Tools:\n\n1. 💬 ChatGPT\n2. 🎨 Leonardo\n3. 📊 Gamma\n4. 🎬 Runway\n5. 🗣️ ElevenLabs\n6. ✂️ Remove.bg\n7. ✨ Upscale\n8. 💡 Ideogram\n9. 🎙️ Otter\n10. 📄 ChatPDF\n\nEkta tool select koro!`;
    } else if (text.startsWith("/earn")) {
      replyText = `💰 Earn Zone:\n\n💼 Tasks | Daily Check-in\n👥 Refer = 50 Taka\n🎯 Complete Task = 10 Taka\n\nBalance check korte /wallet likho`;
    } else if (text.startsWith("/wallet")) {
      replyText = `💳 Tomar Wallet:\n\nBalance: 0 Taka\nEarning: 0 Taka\nReferral: 0 Jon\n\nWithdraw minimum 500 Taka`;
    } else if (text.startsWith("/refer")) {
      replyText = `👥 Refer & Earn:\n\nTomar Link:\nhttps://t.me/ARFAN_AI_Studio_bot?start=${chatId}\n\n1 Refer = 50 Taka\n10 Refer = 500 Taka + Premium FREE!`;
    } else if (text.startsWith("/market")) {
      replyText = `🛒 Marketplace:\n\nLogo Design - 300tk\nThumbnail - 200tk\nVoice Over - 500tk\nVideo Edit - 800tk\n\nOrder korte inbox koro!`;
    } else if (text.startsWith("/premium")) {
      replyText = `⭐ Premium Plan:\n\nMonthly - 499 Taka\nUnlimited AI Tools\nNo Ads\nFast Speed\n\nBkash: 01XXXXXXXXX`;
    } else {
      replyText = `Tumi bolso: ${text}\n\nARFAN AI Studio Ready! 🚀\nMenu dekhte /start likho`;
    }

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: replyText })
    });

    res.status(200).json({ok:true});
  } catch (e) {
    res.status(200).json({ok:true});
  }
}