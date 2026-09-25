export default async function handler(req,res){
if(req.method==='GET')return res.status(200).send('V15 FINAL FIXED ✅');
const BOT=process.env.BOT_TOKEN;const KEY=process.env.OPENROUTER_API_KEY;
const msg=req.body?.message;if(!msg?.text)return res.status(200).send('ok');
const chatId=msg.chat.id;const text=msg.text.trim();
if(text.startsWith('/start')){
await fetch(`https://api.telegram.org/bot${BOT}/sendMessage`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:chatId,text:'🔥 ARFAN AI V15 LIVE\n\n/ai diye prosno koro mama!'})});
return res.status(200).send('ok');}
if(text.toLowerCase().startsWith('/ai')){
let prompt=text.slice(3).trim();if(!prompt)prompt='hi';
try{
const r=await fetch('https://openrouter.ai/api/v1/chat/completions',{method:'POST',headers:{'Authorization':`Bearer ${KEY}`,'Content-Type':'application/json','HTTP-Referer':'https://arfan-ai-studio.vercel.app','X-Title':'ARFAN AI'},body:JSON.stringify({model:'google/gemma-2-9b-it:free',messages:[{role:'user',content:prompt}]})});
const d=await r.json();
let reply=d.choices?.[0]?.message?.content||`OpenRouter Error: ${JSON.stringify(d).slice(0,500)}`;
await fetch(`https://api.telegram.org/bot${BOT}/sendMessage`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:chatId,text:reply})});
}catch(e){await fetch(`https://api.telegram.org/bot${BOT}/sendMessage`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:chatId,text:`Fetch Error: ${e.message}`})});}
return res.status(200).send('ok');}
return res.status(200).send('ok');}