const { Telegraf, Markup } = require('telegraf');

const BOT_TOKEN = 'PASTE_YOUR_BOT_TOKEN_HERE';

const bot = new Telegraf(BOT_TOKEN);

// Start Command
bot.start((ctx) => {
  ctx.reply(
    `🔥 Hey ${ctx.from.first_name}! Welcome to ARFAN AI STUDIO 🔥\n\n` +
    `🎨 Ami tomar AI Image Generator Bot!\n\n` +
    `Commands:\n` +
    `/gen - Image generate koro\n` +
    `/help - Help dekho\n\n` +
    `Just /gen likhe prompt dao! Example: /gen a cyberpunk cat in Dhaka`,
    Markup.inlineKeyboard([
      [Markup.button.callback('🎨 Generate Image', 'gen')],
      [Markup.button.url('👨‍💻 Owner', 'https://t.me/arfan')]
    ])
  );
});

bot.help((ctx) => {
  ctx.reply(
    `🆘 ARFAN AI STUDIO HELP\n\n` +
    `1. /gen <tomar prompt> likho\n` +
    `Example: /gen beautiful girl, anime style\n\n` +
    `2. Bot 10 sec e image baniye dibe!\n\n` +
    `Made with ❤️ by Arfan`
  );
});

// Generate Command - Demo Version
bot.command('gen', async (ctx) => {
  const prompt = ctx.message.text.replace('/gen', '').trim();
  if (!prompt) {
    return ctx.reply('❌ Prompt dao vai! Example:\n/gen a lion wearing lungi in Khulna');
  }

  await ctx.reply(`🎨 Prompt: "${prompt}"\n\n⏳ Generating... 10s wait koro...`);

  // Demo image - ekhane pore Pollinations / Flux API add korbo
  const encodedPrompt = encodeURIComponent(prompt);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true`;

  try {
    await ctx.replyWithPhoto(imageUrl, {
      caption: `✅ Done! Prompt: ${prompt}\n\n🔥 ARFAN AI STUDIO`,
      ...Markup.inlineKeyboard([
        [Markup.button.callback('🔄 Regenerate', 'regen')],
        [Markup.button.callback('🎨 New Prompt', 'gen')]
      ])
    });
  } catch (e) {
    ctx.reply('❌ Error! Abar try koro, prompt ta change kore.');
  }
});

bot.action('gen', (ctx) => {
  ctx.reply('👉 /gen likhe tomar prompt dao! Example:\n/gen futuristic rickshaw in Khulna');
});

// Vercel er jonno
module.exports = async (req, res) => {
  try {
    await bot.handleUpdate(req.body);
  } catch(e) {}
  res.status(200).send('OK');
};

// Local testing er jonno
if (require.main === module) {
  bot.launch();
  console.log('Bot started!');
}