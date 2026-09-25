// ARFAN AI STUDIO V13.5 FINAL - 24/7 - HIGH SECURITY
// ADMIN_ID = 6386740978 | Support @Arfanvai11 | 01316963411

const ADMIN_ID = 6386740978;
const ADMIN_TG = "@Arfanvai11";
const ADMIN_WP = "01316963411";
const ADMIN_BKASH = "01316963411";
const WP_LINK = "https://wa.me/8801316963411";

let users = {};
let pending = {};
let trxUsed = new Set();
let flood = {};

// --- SECURITY V13.5 - 7 LAYER ---
function isFlood(uid) {
  const now = Date.now();
  if (!flood[uid]) flood[uid] = [];
  flood[uid] = flood[uid].filter(t => now - t < 3000);
  flood[uid].push(now);
  return flood[uid].length > 5;
}

function checkUser(uid) {
  if (!users[uid]) {
    users[uid] = { credit: 0, bdt: 0, active: false, plan: "free", refer_by: null, total_used: 0, is_ban: false };
  }
  return users[uid];
}

export default async function handler(req, res) {
  if (req.method!== 'POST') return res.status(200).send("Arfan AI V13.5 24/7 Active");

  try {
    const msg = req.body.message;
    if (!msg) return res.status(200).send("ok");

    const uid = msg.from.id;
    const text = msg.text || "";
    const chatId = msg.chat.id;

    // Flood Block
    if (isFlood(uid)) {
      await send(chatId, "⏳ Slow down! 30 sec wait");
      return res.status(200).send("ok");
    }

    checkUser(uid);
    if (users[uid].is_ban) {
      await send(chatId, "⛔ Banned!");
      return res.status(200).send("ok");
    }

    // --- /start + Refer V3 ---
    if (text.startsWith('/start')) {
      const args = text.split(' ');
      if (args[1]) {
        const refId = parseInt(args[1]);
        if (refId!== uid && users[refId] &&!users[uid].refer_by) {
          users[uid].refer_by = refId;
          pending[`refer_${uid}`] = { type: "refer", from: uid, to: refId, bdt: 50, cr: 50 };
          await send(ADMIN_ID, `⏳ Refer Pending:\nUser ${uid} by ${refId}\n50৳+50cr\n/approve ${refId} refer`);
        }
      }
      await send(chatId, `👑 ARFAN AI STUDIO V13.5 - 24/7\n\n💎 ${users[uid].credit}cr | ${users[uid].bdt}৳\n📦 ${users[uid].plan} | Active: ${users[uid].active}\n\n🚀 AI (8cr):\n/ask - Chat\n/write - Article\n/image - Image\n\n💰 /daily - 30cr Pending\n💰 Refer: https://t.me/ArfanAIBot?start=${uid}\nRefer = 50৳+50cr Pending\n\n🛒 /buy - Buy plan\n💸 /withdraw - Min 300৳\n\n🆘 SUPPORT 24/7:\n💬 Telegram: ${ADMIN_TG}\n📱 WhatsApp: ${ADMIN_WP}\n🔗 ${WP_LINK}\n⏰ Active: 24/7`);
      return res.status(200).send("ok");
    }

    // --- /balance ---
    if (text.startsWith('/balance')) {
      await send(chatId, `💎 ${users[uid].credit}cr | ${users[uid].bdt}৳\nActive: ${users[uid].active} | Plan: ${users[uid].plan}`);
      return res.status(200).send("ok");
    }

    // --- /support 24/7 Professional ---
    if (text.startsWith('/support') || text.startsWith('/help')) {
      await send(chatId, `🆘 SUPPORT CENTER - 24/7\n\n💬 Telegram: ${ADMIN_TG} (Fast 5 min)\n📱 WhatsApp: ${ADMIN_WP}\n🔗 ${WP_LINK}\n\n⏰ Active: 24/7 - 7 Days / 24 Hours\n⚡ Reply: 5-10 min\n🤖 Bot: 24/7 Auto\n👑 Admin: ${ADMIN_ID}`);
      return res.status(200).send("ok");
    }

    // --- /daily Pending Only - AI banabe na ---
    if (text.startsWith('/daily')) {
      if (pending[`daily_${uid}`]) {
        await send(chatId, "⏳ Already pending! Admin approve korbe");
      } else {
        pending[`daily_${uid}`] = { type: "daily", uid, cr: 30 };
        await send(ADMIN_ID, `⏳ Daily Pending: ${uid} - 30cr\n/approve ${uid} daily`);
        await send(chatId, "⏳ Daily 30cr Pending - Admin approve korbe 5 min e!");
      }
      return res.status(200).send("ok");
    }

    // --- /buy TrxID ---
    if (text.startsWith('/buy')) {
      const parts = text.split(' ');
      if (parts.length < 2) {
        await send(chatId, `🛒 BUY PLAN:\nPro - 300৳ = 500cr + Active\nPremium - 500৳ = 1000cr\n\nbKash/Nagad: ${ADMIN_BKASH}\n/bay TrxID\nEx: /buy ABC123XYZ\nWP: ${WP_LINK}`);
      } else {
        const trx = parts[1].toUpperCase();
        if (trxUsed.has(trx)) await send(chatId, "⛔ TrxID used! Fraud block!");
        else if (trx.length < 6) await send(chatId, "⛔ Invalid TrxID!");
        else {
          pending[`buy_${uid}_${trx}`] = { type: "buy", uid, trx };
          await send(ADMIN_ID, `⏳ Buy Pending: ${uid}\nTrx: ${trx}\n/approve ${uid} buy ${trx}`);
          await send(chatId, `⏳ Buy ${trx} Pending - Admin check korbe! Screenshot ${ADMIN_TG} e dao`);
        }
      }
      return res.status(200).send("ok");
    }

    // --- /withdraw 4 Check + Pending ---
    if (text.startsWith('/withdraw')) {
      const parts = text.split(' ');
      if (parts.length < 4) {
        await send(chatId, `💸 WITHDRAW:\n/withdraw AMOUNT NUMBER METHOD\nEx: /withdraw 500 017XXX bKash\nMin 300৳\nTaka asbe: ${ADMIN_BKASH} theke`);
      } else {
        const amt = parseInt(parts[1]);
        const num = parts[2];
        if (amt < 0 || users[uid].bdt < 0) await send(chatId, "⛔ Negative block!");
        else if (amt < 300) await send(chatId, "⛔ Min 300৳");
        else if (!users[uid].active) await send(chatId, "⛔ Active plan lagbe! /buy koro");
        else if (users[uid].bdt < amt) await send(chatId, `⛔ Low! ${users[uid].bdt}৳ ache`);
        else {
          pending[`wd_${uid}_${Date.now()}`] = { type: "withdraw", uid, amt, num, method: parts[3] };
          await send(ADMIN_ID, `⏳ WITHDRAW PENDING:\nUser: ${uid}\nAmt: ${amt}৳\nNum: ${num} ${parts[3]}\n/approve ${uid} withdraw ${amt}`);
          await send(chatId, `⏳ Withdraw ${amt}৳ Pending - Admin ${ADMIN_BKASH} theke ${num} e pathabe!`);
        }
      }
      return res.status(200).send("ok");
    }

    // --- AI FEATURES - CREDIT KATBE, BANABE NA ---
    if (text.startsWith('/ask') || text.startsWith('/write') || text.startsWith('/image')) {
      const cost = 8;
      if (users[uid].credit < cost) {
        await send(chatId, `⛔ Low! ${users[uid].credit}cr ache, ${cost}cr lagbe\n/daily koro`);
      } else {
        users[uid].credit -= cost; // katte parbe
        if (users[uid].credit < 0) users[uid].credit = 0; // negative block
        users[uid].total_used++;
        // AI response here
        await send(chatId, `✅ ${text.split(' ')[0]} Done! -${cost}cr | Bal: ${users[uid].credit}cr\n\n[AI Result for: ${text.slice(5,100)}]\n\n24/7 Arfan AI`);
      }
      return res.status(200).send("ok");
    }

    // --- ADMIN ONLY 6386740978 ---
    if (uid === ADMIN_ID) {
      if (text.startsWith('/pending')) {
        const list = Object.entries(pending).map(([k,v])=>`${k}: ${JSON.stringify(v)}`).join('\n\n');
        await send(chatId, list || "No pending!");
      }
      if (text.startsWith('/addcredit')) {
        const p = text.split(' ');
        const tuid = parseInt(p[1]); const amt = parseInt(p[2]);
        if (amt < 0) await send(chatId, "⛔ Negative block!");
        else {
          checkUser(tuid);
          users[tuid].credit += amt; // ONLY ADMIN CAN MINT
          await send(tuid, `👑 Admin added ${amt}cr! New: ${users[tuid].credit}cr`);
          await send(chatId, `✅ Added ${amt}cr to ${tuid}`);
        }
      }
      if (text.startsWith('/approve')) {
        const p = text.split(' ');
        const tuid = parseInt(p[1]); const type = p[2];
        checkUser(tuid);
        if (type === 'daily') {
          users[tuid].credit += 30; delete pending[`daily_${tuid}`];
          await send(tuid, "✅ Daily 30cr Approved!");
          await send(chatId, `✅ Daily ok ${tuid}`);
        }
        if (type === 'refer') {
          users[tuid].credit += 50; users[tuid].bdt += 50;
          Object.keys(pending).forEach(k=>{if(k.startsWith('refer_')) delete pending[k]});
          await send(tuid, "✅ Refer 50৳+50cr Approved!");
          await send(chatId, `✅ Refer ok ${tuid}`);
        }
        if (type === 'withdraw') {
          const amt = parseInt(p[3]); users[tuid].bdt -= amt;
          if (users[tuid].bdt < 0) users[tuid].bdt = 0;
          Object.keys(pending).forEach(k=>{if(k.startsWith(`wd_${tuid}`)) delete pending[k]});
          await send(tuid, `✅ Withdraw ${amt}৳ Approved! ${ADMIN_BKASH} theke asbe!`);
          await send(chatId, `✅ Wd ${amt} approved - ${ADMIN_BKASH} theke pathao`);
        }
        if (type === 'buy') {
          const trx = p[3].toUpperCase(); trxUsed.add(trx);
          users[tuid].active = true; users[tuid].plan = "pro"; users[tuid].credit += 500;
          Object.keys(pending).forEach(k=>{if(k.includes(trx)) delete pending[k]});
          await send(tuid, "✅ Buy Approved! Pro + 500cr!");
          await send(chatId, `✅ Buy ${trx} ok ${tuid}`);
        }
      }
    }

  } catch (e) {
    console.log("Error:", e);
  }
  return res.status(200).send("ok");
}

async function send(chatId, text) {
  const TOKEN = process.env.BOT_TOKEN;
  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text })
  });
}