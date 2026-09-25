// ARFAN AI STUDIO V22 ULTIMATE - V1 TO V22 ALL COMBINED
// Features: FREE AI + REFER + EARN + WALLET + MARKET + WITHDRAW 15% / VIP 10% / AWithdraw 0% / MARKET 15%

const BOT_TOKEN = process.env.BOT_TOKEN;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const ADMIN_ID = 6254422297; // <-- TOR ID BOSA @userinfobot theke
const ADMIN_NUMBER = "01316963411";
const BOT_USERNAME = "ARFAN_AI_Studio_bot"; // tomar bot username

const PLANS = {
  easy: { price: 99, days: 7, cr: 150, name: "Easy" },
  normal: { price: 299, days: 15, cr: 500, name: "Normal" },
  pro: { price: 499, days: 20, cr: 1000, name: "Pro" },
  proplus: { price: 699, days: 25, cr: 1800, name: "ProPlus", vip: true },
  max: { price: 1299, days: 30, cr: 4000, name: "Max", vip: true }
};

const rateLimit = new Map();

export default async function handler(req, res) {
  try {
    if (req.method === "GET") return res.status(200).send("ARFAN AI V22 ULTIMATE LIVE ✅");
    const update = req.body;
    const msg = update?.message;
    if (!msg?.text) return res.status(200).send("ok");

    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const text = msg.text.trim();
    const username = msg.from.username || "mama";

    // Rate limit 3 sec
    const now = Date.now();
    if (rateLimit.has(userId) && now - rateLimit.get(userId) < 3000) {
      await send(chatId, "⏳ Slow mama, 3 sec por!");
      return res.status(200).send("ok");
    }
    rateLimit.set(userId, now);

    // --- DB HELPERS ---
    const getUser = async () => {
      try {
        let r = await fetch(`${SUPABASE_URL}/rest/v1/users?id=eq.${userId}`, {
          headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
        });
        let data = await r.json();
        if (data.length === 0) {
          let refId = null;
          if (text.includes("/start")) {
            let parts = text.split(" ");
            if (parts[1] &&!isNaN(parts[1])) refId = parseInt(parts[1]);
            if (parts[1]?.startsWith("ref_")) refId = parseInt(parts[1].replace("ref_",""));
          }
          let newUser = {
            id: userId, username, credit: 20, referral_bdt: 0,
            plan: null, plan_expire: null, is_vip: false, refer_by: refId
          };
          await fetch(`${SUPABASE_URL}/rest/v1/users`, {
            method: "POST",
            headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
          });
          if (refId && refId!== userId) {
            // Refer bonus 50tk + 50cr
            let rr = await fetch(`${SUPABASE_URL}/rest/v1/users?id=eq.${refId}`, {
              headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
            });
            let dd = await rr.json();
            if (dd[0]) {
              await fetch(`${SUPABASE_URL}/rest/v1/users?id=eq.${refId}`, {
                method: "PATCH",
                headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json" },
                body: JSON.stringify({ referral_bdt: (dd[0].referral_bdt||0)+50, credit: (dd[0].credit||0)+50 })
              });
              await send(refId, `🔥 New Refer! @${username} joined! +50৳ +50cr bonus!`);
            }
          }
          return newUser;
        }
        return data[0];
      } catch(e){ return { id: userId, credit: 20, referral_bdt: 0, plan: null, is_vip: false }; }
    };

    const updateUser = async (updates) => {
      await fetch(`${SUPABASE_URL}/rest/v1/users?id=eq.${userId}`, {
        method: "PATCH",
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify(updates)
      });
    };

    const addAdminIncome = async (cr) => {
      try {
        let r = await fetch(`${SUPABASE_URL}/rest/v1/admin_income?id=eq.1`, {
          headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
        });
        let d = await r.json();
        let total = (d[0]?.total_bdt || 0) + (cr * 5); // 1cr = 5tk income logic
        await fetch(`${SUPABASE_URL}/rest/v1/admin_income`, {
          method: "POST",
          headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", Prefer: "resolution=merge-duplicates" },
          body: JSON.stringify({ id: 1, total_bdt: total })
        });
      } catch(e){}
    };

    let user = await getUser();

    // ===== COMMANDS =====

    if (text.startsWith("/start")) {
      let m = `👋 *ARFAN AI STUDIO V22 LIVE* 🚀\n\n`+
      `Hi @${username}!\n✅ 20cr FREE\n✅ Refer = 50৳ + 50cr\n\n`+
      `🤖 */ai* - Free AI chat (8cr)\n`+
      `💰 */balance* */wallet* - Balance\n`+
      `🛒 */buy* - Plan kino\n`+
      `💼 */work* - Kaj kore earn\n`+
      `🏪 */market* - Credit bazar\n`+
      `👥 */refer* */earn* - Refer earn\n`+
      `💸 */withdraw* - Taka tulo\n`+
      `📚 */aihub* - AI Tools\n`+
      `💎 */premium* - VIP status\n\n`+
      `🔥 Just likho: /ai tomar proshno`;
      await send(chatId, m);
    }
    else if (text.startsWith("/balance") || text.startsWith("/wallet") || text.startsWith("/premium")) {
      let vipTxt = user.is_vip? "VIP - Fee 10%" : "Normal - Fee 15%";
      await send(chatId, `👛 *WALLET*\n\nID: ${userId}\nCredit: *${user.credit}cr*\nRefer BDT: *${user.referral_bdt}৳*\nPlan: ${user.plan||"Free"}\nStatus: ${vipTxt}\n\n⚠️ Credit withdraw hobe NA, sudhu Refer BDT!\nLink: https://t.me/${BOT_USERNAME}?start=${userId}`);
    }
    else if (text.startsWith("/buy")) {
      let t = `🛒 *PLANS - bKash ${ADMIN_NUMBER}*\n\n`;
      for (let k in PLANS) {
        let p = PLANS[k];
        t += `*${p.name}* - ${p.price}৳ - ${p.cr}cr - ${p.days}din ${p.vip?"(VIP 10%)":""}\n👉 /buy_${k}\n\n`;
      }
      t += `Send Money kore /verify TrxID likho`;
      await send(chatId, t);

      // handle /buy_easy etc
      for (let k in PLANS) {
        if (text === `/buy_${k}`) {
          await send(chatId, `✅ ${PLANS[k].name} select! \n${PLANS[k].price}৳ bKash ${ADMIN_NUMBER} e Send Money koro\nTarpor /verify 123456789 likho\n\nAuto add hobe admin approve korle`);
        }
      }
    }
    else if (text.startsWith("/refer") || text.startsWith("/earn")) {
      await send(chatId, `👥 *REFER & EARN*\n\nLink: https://t.me/${BOT_USERNAME}?start=${userId}\nPer Refer: 50৳ + 50cr\n\n10 refer = 500৳ + 500cr\nBDT tulte /withdraw`);
    }
    else if (text.startsWith("/work")) {
      let bonus = 5;
      if (text.includes("write")) bonus = 5;
      if (text.includes("image")) bonus = 10;
      await updateUser({ credit: (user.credit||0)+bonus });
      await send(chatId, `💼 *WORK DONE!* +${bonus}cr\nBalance: ${user.credit+bonus}cr\n\n/work write - 5cr\n/work image - 10cr\nKore credit jomao, /market e sell koro!`);
    }
    else if (text.startsWith("/market")) {
      await send(chatId, `🏪 *MARKETPLACE - Fee 15%*\n\nUser ra credit sell kore BDT income!\n\n/sell 100 5 - 100cr sell 5tk/cr\n/buy_credit 100 - Kino\n\nTumi sell korle 15% fee admin pabe!\n\nbKash: ${ADMIN_NUMBER}`);
    }
    else if (text.startsWith("/aihub")) {
      await send(chatId, `📚 *AI HUB*\n\n/ai - Chat\nImage Gen - Soon\nCode Help - /ai code likhe deo\n\nJust /ai diye suru koro mama!`);
    }
    else if (text.startsWith("/ai ")) {
      if ((user.credit||0) < 8) {
        await send(chatId, "❌ Credit sesh! /buy koro ba /work koro");
        return res.status(200).send("ok");
      }
      let prompt = text.replace("/ai ","").slice(0,3500);
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendChatAction`, {
        method: "POST", headers: {"Content-Type":"application/json"},
        body: JSON.stringify({chat_id: chatId, action: "typing"})
      });
      try {
        let aiRes = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}`);
        let aiText = await aiRes.text();
        aiText = aiText.slice(0,3500);
        await updateUser({ credit: user.credit-8 });
        await addAdminIncome(8);
        await send(chatId, `🤖 *ARFAN AI:*\n\n${aiText}\n\n-8cr | Bal: ${user.credit-8}cr`);
      } catch(e){ await send(chatId, "❌ AI busy, abar try koro"); }
    }
    else if (text.startsWith("/withdraw")) {
      let parts = text.split(" ");
      if (parts.length < 3) {
        await send(chatId, "Use: /withdraw 500 017XXXXXXXX bKash\nMin 300৳\nSUDHU Refer BDT, Credit NA!\nPlan thakte hobe!");
        return res.status(200).send("ok");
      }
      let amount = parseInt(parts[1]);
      let number = parts[2];
      if (!user.plan) { await send(chatId, "❌ BLOCK! Age /buy koro, plan chara withdraw hobe na"); return res.status(200).send("ok"); }
      if (amount < 300) { await send(chatId, "❌ Min 300৳"); return res.status(200).send("ok"); }
      if ((user.referral_bdt||0) < amount) { await send(chatId, `❌ Refer BDT: ${user.referral_bdt}৳ only! Credit withdraw hobe na`); return res.status(200).send("ok"); }
      let feeP = user.is_vip? 10 : 15;
      let fee = Math.floor(amount*feeP/100);
      let getAmt = amount-fee;
      await updateUser({ referral_bdt: user.referral_bdt - amount });
      await send(chatId, `✅ Withdraw Pending\nAmount: ${amount}৳\nFee ${feeP}%: ${fee}৳\nPabe: ${getAmt}৳\nTo: ${number}\nAdmin ${ADMIN_NUMBER} theke dibe`);
      await send(ADMIN_ID, `💸 WITHDRAW\nUser ${userId} @${username}\n${amount}->${getAmt} fee ${fee}\nTo: ${number}`);
    }
    else if (text.startsWith("/awithdraw")) {
      if (userId!== ADMIN_ID) { await send(chatId, "❌ Admin only"); return res.status(200).send("ok"); }
      let amt = parseInt(text.split(" ")[1]||0);
      let r = await fetch(`${SUPABASE_URL}/rest/v1/admin_income?id=eq.1`, { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } });
      let d = await r.json();
      let total = d[0]?.total_bdt||0;
      if (total < amt) { await send(chatId, `❌ Fund kom: ${total}৳`); return res.status(200).send("ok"); }
      await fetch(`${SUPABASE_URL}/rest/v1/admin_income?id=eq.1`, {
        method: "PATCH", headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type":"application/json" },
        body: JSON.stringify({ total_bdt: total-amt })
      });
      await send(chatId, `✅ ADMIN WITHDRAW ${amt}৳ -> ${ADMIN_NUMBER} Fee 0% | Left ${total-amt}৳`);
    }
    else if (text.startsWith("/admin") && userId===ADMIN_ID) {
      let r = await fetch(`${SUPABASE_URL}/rest/v1/admin_income?id=eq.1`, { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } });
      let d = await r.json();
      await send(chatId, `👑 ADMIN\nIncome: ${d[0]?.total_bdt||0}৳\nNumber: ${ADMIN_NUMBER}\n/awithdraw 1000`);
    }
    else if (text.startsWith("/verify")) {
      await send(chatId, `✅ TrxID received! Admin check kore credit add korbe 1-5 min e! bKash: ${ADMIN_NUMBER}`);
      await send(ADMIN_ID, `🔔 VERIFY REQ\nUser ${userId} @${username}\n${text}\nPlan: ${user.plan}`);
    }
    else {
      // normal chat = AI
      if ((user.credit||0) >= 8) {
        let prompt = text.slice(0,3500);
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendChatAction`, {
          method: "POST", headers: {"Content-Type":"application/json"},
          body: JSON.stringify({chat_id: chatId, action: "typing"})
        });
        try {
          let aiRes = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}`);
          let aiText = await aiRes.text();
          await updateUser({ credit: user.credit-8 });
          await addAdminIncome(8);
          await send(chatId, `${aiText.slice(0,3500)}\n\n-8cr | /balance`);
        } catch(e){}
      }
    }

    return res.status(200).send("ok");
  } catch(e){ console.error(e); return res.status(200).send("ok"); }
}

async function send(chatId, text){
  try{
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ chat_id: chatId, text: text.slice(0,4000), parse_mode: "Markdown" })
    });
  }catch(e){}
}