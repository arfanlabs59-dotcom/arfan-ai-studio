const { Telegraf } = require('telegraf');
const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(`🔥 Hey ${ctx.from.first_name}! Welcome to ARFAN AI STUDIO 🔥\n\n🎨 Ami tomar AI Image Bot!\n\nCommands:\n/gen - Image banao\n/help - Help`);
});

bot.help((ctx) => ctx.reply('Help: /gen <prompt> dao\nEx: /gen a cute cat'));

bot.command('gen', (ctx) => {
  const prompt = ctx.message.text.split('/gen ')[1];
  if (!prompt) return ctx.reply('Prompt dao! Ex: /gen a dragon');
  ctx.reply(`🎨 Generating: "${prompt}"... (AI add korbo pore)`);
});

module.exports = async (req, res) => {
  try {
    await bot.handleUpdate(req.body);
    res.status(200).send('OK');
  } catch (e) {
    console.error(e);
    res.status(200).send('OK');
  }
};