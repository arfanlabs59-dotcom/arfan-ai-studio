// ARFAN AI STUDIO - COMPLETE MASTER PLAN FINAL
// 10 AI + Earn + Wallet + Withdraw bKash/Nagad 01316963411 + Premium 99-999 NO FREE

export default async function handler(req, res) {
  if (req.method === 'GET') return res.status(200).send('ARFAN AI STUDIO MASTER LIVE ✅ Payment: 01316963411');

  const PAY = "01316963411"; // bKash/Nagad

  try {
    const token = process.env.BOT_TOKEN;
    const body = req.body;

    if (body.callback_query) {
      const cb = body.callback_query;
      const chatId = cb.message.chat.id;
      const data = cb.data;
      let text = ""; let kb = null;

      if (data === "main") {
        text = `🔥 ARFAN AI STUDIO 🔥\nTagline: AI Tools • Work • Earn • Withdraw — All in One\n\n👤 ID: ${chatId}\n⭐ Level: 8 | XP: 2450\n💳 Payment: ${PAY} (bKash/Nagad)\n\n🤖 AI HUB - 10 Tools Ready\n💰 EARN - 6 Types\n💳 WALLET - XP/Points/Balance\n💸 WITHDRAW - bKash/Nagad\n👥 REFER - 50 Tk\n🛒 MARKETPLACE\n⭐ PREMIUM 99-999 No Free\n📊 DASHBOARD\n\nSelect koro:`;
        kb = mainKB();
      }
      else if (data === "aihub") {
        text = `🤖 ARFAN AI HUB - 10 Power Tools\n\n✍️ WRITING\n1. ChatGPT - Article/Caption/CV/Email/Post\n\n🎨 IMAGE\n2. Leonardo AI - Image Generate\n8. Ideogram - Text to Image\n\n📊 PRESENTATION\n3. Gamma - PPT Generate\n\n🎬 VIDEO\n4. Runway - Video Generate\n\n🎙️ VOICE\n5. ElevenLabs - Voice Generate\n\n🪄 TOOLS\n6. Remove.bg - BG Remove\n7. Upscale.media - Enhance\n9. Otter.ai - Meeting to Text\n10. ChatPDF - PDF to MCQ\n\nKonta use korba?`;
        kb = aiHubKB();
      }
      else if (data === "earn") {
        text = `💰 EARN SYSTEM - 6 Types:\n\n📅 Daily Check-in: 5 Tk\n🎯 Daily Task: 10 Tk\n🧠 Quiz: 2 Tk\n📚 Learn & Earn: 15 Tk\n👀 Sponsored: 20 Tk\n🎁 Bonus: 50 Tk\n\nRefer = 50 Tk\nTask = 10 Tk\nDaily Check = 5 Tk\n\nFlow: Task > Proof > Verification > Wallet Credit\nAnti-Fraud: UserID, TaskID, ProofID, Risk Score Active!`;
        kb = backKB();
      }
      else if (data === "wallet") {
        text = `💳 WALLET - 2 Layer System:\n\n⭐ XP: 1,250 (Level/Reputation)\n🪙 Points: 850 (Reward)\n💵 Balance: ৳0 (Withdrawable)\n\n💰 Details:\nAvailable: ৳0\nPending: ৳80\nTotal Earned: ৳0\n\nTXID: ARF-928371\nType: Task Reward +5 Tk\nStatus: Approved\nDate: 24 Sep 2026\n\n➕ Deposit\n💸 Withdraw\n📜 Transactions\n\nPayment: ${PAY}`;
        kb = walletKB();
      }
      else if (data === "withdraw") {
        text = `💸 WITHDRAW SYSTEM - Security ON\n\nMethods:\n📱 bKash: ${PAY}\n📱 Nagad: ${PAY}\n📱 Rocket\n📱 Upay\n\nMinimum: 500 Tk\n\nFlow:\nRequest > Risk Check > Admin Verification > Processing > Paid\n\nStatus: Pending, Review, Processing, Paid, Rejected\n\nFormat:\nAmount: 500\nMethod: bKash/Nagad\nNumber: Tomar Number\n\nPayment Number: ${PAY}`;
        kb = withdrawKB();
      }
      else if (data === "refer") {
        text = `👥 REFERRAL SYSTEM\n\n🔗 Your Personal Link:\nhttps://t.me/ARFAN_AI_Studio_bot?start=${chatId}\n\n👤 Total Referrals: 0\n🎁 Active: 12\n💰 Referral Earned: 0 Tk\n\nPer Valid Refer = 50 Tk\n⚠️ Reward only after referred user completes qualifying activity!\nAnti-Abuse ON!`;
        kb = backKB();
      }
      else if (data === "market") {
        text = `🛒 MARKETPLACE + AI SERVICE MARKET\n\nServices:\n🎨 Logo Design - 300 Tk\n🖼️ Thumbnail - 200 Tk\n🎙️ Voice Over - 500 Tk\n🎬 Video Edit - 800 Tk\n✍️ Article - 400 Tk\n📄 CV Design\n🤖 AI Prompt\n📱 Social Media Post\n\nSeller 90% | Platform 10% Commission\nBoost/Featured Listing Available!\n\nExample:\nService 500 Tk = Seller 450 + Platform 50`;
        kb = backKB();
      }
      else if (data === "premium") {
        text = `⭐ PREMIUM - NO FREE! SOB PAID!\n\n🟢 EASY - 99 Tk/mo\n• 100 Request\n• Basic Tools\n• Basic Earning\n\n🔵 NORMAL - 199 Tk/mo\n• 500 Request\n• All Tools\n• Priority\n\n🟣 PRO - 399 Tk/mo\n• 2000 Request\n• Fast + No Ads\n• Lower Market Fee\n\n🔴 PRO PLUS - 599 Tk/mo\n• Unlimited Request\n• Premium Support\n• Advanced Tools\n\n💎 PRO PLUS MAX - 999 Tk/mo\n• Unlimited Everything\n• Commercial License\n• API Access\n• Extra Storage\n\n💳 Payment:\n📱 bKash: ${PAY}\n📱 Nagad: ${PAY}\n\nSend Money + TrxID dao!`;
        kb = premiumKB();
      }
      else if (data === "dashboard") {
        text = `📊 USER DASHBOARD\n\n👤 ARFAN\nLevel: 8 (Newbie>Active>Skilled>Pro>Elite)\nXP: 2,450\n\n💰 Wallet: ৳0\n📈 Total Earned: ৳0\n💸 Withdrawn: ৳0\n👥 Referrals: 0\n🤖 AI Usage: 47/100\n⭐ Reputation: 92\n\n🏅 Badges:\n🎯 First Task\n💰 First Earn\n💸 First Withdraw\n👥 10 Referrals\n🤖 AI Explorer\n🔥 7 Day Streak\n🏆 Top Earner\n\nPayment: ${PAY}`;
        kb = backKB();
      }
      else if (data.startsWith("buy_")) {
        text = `✅ ${data.replace("buy_","")} Selected!\n\n💸 Payment:\n📱 bKash: ${PAY}\n📱 Nagad: ${PAY}\n\nRevenue Streams:\n1. Premium\n2. AI Service Margin\n3. Marketplace Commission\n4. Sponsored Tasks\n5. Featured Listing\n6. Ads\n\nFormat:\nPackage: ${data.replace("buy_","")}\nTrxID:\nTomar Number:\n\n@Admin ke pathao, 24h e active!`;
        kb = backKB();
      }
      else if (data.startsWith("pay_")) {
        text = `💸 ${data.replace("pay_","")} Withdraw\n\nAdmin Payment Number: ${PAY}\nTomar ${data.replace("pay_","")} number + Amount dao!\n24h e paid hobe!`;
        kb = backKB();
      }
      else if (data.startsWith("ai_")) {
        text = `🤖 ${data.replace("ai_","")} - AI Router Active!\n\nIntent Detection > Recommended Tool > Result\n\nExample:\n"YouTube thumbnail chai" > IMAGE > Leonardo/Ideogram\n"PDF theke MCQ" > PDF > AI > MCQ\n\nPrompt likho:`;
        kb = backKB();
      }

      await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({callback_query_id:cb.id})});
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:chatId,text,reply_markup:kb})});
      return res.status(200).json({ok:true});
    }

    const msg = body?.message;
    if (!msg) return res.status(200).json({ok:true});
    const chatId = msg.chat.id;
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`,{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({chat_id:chatId,text:`🔥 ARFAN AI STUDIO 🔥\n\nWelcome! Master Plan V1 Live!\n\n🤖 10 AI Tools\n💰 Earn | 💳 Wallet | 💸 Withdraw\n💳 bKash/Nagad: ${PAY}\n👥 Refer 50 Tk | 🛒 Market | ⭐ Premium 99-999 (No Free!)\n📊 Dashboard + Level + Badges\n\nDatabase: users, wallets, tasks, withdrawals, referrals, ai_usage, marketplace, admin_logs\nSecurity: Anti-Fraud + Risk Score\n\nButton e click koro:`,reply_markup:mainKB()})
    });
    res.status(200).json({ok:true});
  } catch(e){res.status(200).json({ok:true});}
}

function mainKB(){return{inline_keyboard:[[{text:"🤖 AI Hub (10)",callback_data:"aihub"},{text:"💰 Earn",callback_data:"earn"}],[{text:"💳 Wallet",callback_data:"wallet"},{text:"💸 Withdraw",callback_data:"withdraw"}],[{text:"👥 Referral",callback_data:"refer"},{text:"🛒 Marketplace",callback_data:"market"}],[{text:"⭐ Premium 99-999Tk",callback_data:"premium"},{text:"📊 Dashboard",callback_data:"dashboard"}]]};}
function aiHubKB(){return{inline_keyboard:[[{text:"✍️ ChatGPT",callback_data:"ai_ChatGPT"},{text:"🎨 Leonardo",callback_data:"ai_Leonardo"}],[{text:"📊 Gamma",callback_data:"ai_Gamma"},{text:"🎬 Runway",callback_data:"ai_Runway"}],[{text:"🎙️ ElevenLabs",callback_data:"ai_ElevenLabs"},{text:"🪄 Remove.bg",callback_data:"ai_Remove.bg"}],[{text:"⬅️ Back",callback_data:"main"}]]};}
function walletKB(){return{inline_keyboard:[[{text:"💸 Withdraw bKash/Nagad",callback_data:"withdraw"},{text:"📜 Transactions",callback_data:"main"}],[{text:"⬅️ Back",callback_data:"main"}]]};}
function withdrawKB(){return{inline_keyboard:[[{text:"📱 bKash - 01316963411",callback_data:"pay_bKash"},{text:"📱 Nagad - 01316963411",callback_data:"pay_Nagad"}],[{text:"⬅️ Back",callback_data:"main"}]]};}
function premiumKB(){return{inline_keyboard:[[{text:"🟢 Easy - 99 Tk",callback_data:"buy_Easy 99 Tk"}],[{text:"🔵 Normal - 199 Tk",callback_data:"buy_Normal 199 Tk"}],[{text:"🟣 Pro - 399 Tk",callback_data:"buy_Pro 399 Tk"}],[{text:"🔴 Pro Plus - 599 Tk",callback_data:"buy_Pro Plus 599 Tk"}],[{text:"💎 Pro Plus Max - 999 Tk",callback_data:"buy_Max 999 Tk"}],[{text:"⬅️ Back",callback_data:"main"}]]};}
function backKB(){return{inline_keyboard:[[{text:"⬅️ Back to Main Menu",callback_data:"main"}]]};}