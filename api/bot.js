export default async function handler(req,res){
if(req.method==='GET')return res.status(200).send('V16 DEBUG FIXED ✅');
const BOT=process.env.BOT_TOKEN;const KEY=process.env.OPENROUTER_API_KEY;
const msg=req.body?.message;if(!msg?.text)return res.status(200).send('ok');
const chatId=msg.chat.id;const txt=msg.text.trim();
if(txt.startsWith('/start')){
await fetch(`https://api.telegram.org/bot${BOT}/sendMessage`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:chatId,text:'👑 V16 LIVE ✅\n\n/ai likho mama!'})});
return res.status(200).send('ok');}
if(txt.toLowerCase().startsWith('/ai')){
if(!KEY){
await fetch(`https://api.telegram.org/bot${BOT}/sendMessage`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:chatId,text:'❌ KEY pai nai! Vercel > Settings > Env Var e OPENROUTER_API_KEY add koro'})});
return res.status(200).send('ok');}
let prompt=txt.slice(3).trim()||'hi';
try{
let r=await fetch('https://openrouter.ai/api/v1/chat/completions',{method:'POST',headers:{'Authorization':'Bearer '+KEY,'Content-Type':'application/json','HTTP-Referer':'https://arfan-ai-studio.vercel.app','X-Title':'ARFAN'},body:JSON.stringify({model:'meta-llama/llama-3.2-3b-instruct:free',messages:[{role:'user',content:prompt}]})});
let d=await r.json();
let ans=d.choices?.[0]?.message?.content||'ERR: '+JSON.stringify(d).slice(0,500);
await fetch(`https://api.telegram.org/bot${BOT}/sendMessage`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:chatId,text:ans})});
}catch(e){
await fetch(`https://api.telegram.org/bot${BOT}/sendMessage`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:chatId,text:'Fetch Fail: '+e.message})});
}
return res.status(200).send('ok');}
return res.status(200).send('ok');
}