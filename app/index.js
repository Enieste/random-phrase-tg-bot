const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const sourceZavet = fs.readFileSync("./source/zavet.txt", 'utf-8');
const sourceTagil = fs.readFileSync("./source/tagil.txt", 'utf-8');

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, {polling: true});

const zavet = "завет";
const tagil = "кринж";

const textArrayZavet = sourceZavet.split('. ')
const textArrayTagil = sourceTagil.split('. ')

const getRandomPhrase = (source) => source[Math.floor(Math.random()*source.length)].trim();

bot.on('message', (msg) => {
  const opts = {
    parse_mode: 'Markdown'
  };
  if (msg.text.toString().toLowerCase().includes(zavet)) {
    bot.sendMessage(msg.chat.id, `*Вы помянули Завет всуе. Получайте предсказание на сегодня:* "${getRandomPhrase(textArrayZavet)}"`, opts);
  }

  if (msg.text.toString().toLowerCase().includes(tagil)) {
    bot.sendMessage(msg.chat.id, `*Тем временем в Тагиле:* "${getRandomPhrase(textArrayTagil)}"`, opts);
  }
});