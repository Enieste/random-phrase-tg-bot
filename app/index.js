const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const source = fs.readFileSync("./source/zavet.txt", 'utf-8');

const token = '5207082607:AAFVOFQF8Ce-Rxm30RL2HqEavC35yBWR8cw';

const bot = new TelegramBot(token, {polling: true});

const textArray = source.split('. ')

const getRandomPhrase = () => textArray[Math.floor(Math.random()*textArray.length)];

bot.on('message', (msg) => {
  const opts = {
    parse_mode: 'Markdown'
  };
  let codephrase = "завет";
  if (msg.text.toString().toLowerCase().includes(codephrase)) {
    bot.sendMessage(msg.chat.id, `*Вы помянули Завет всуе. Получайте предсказание на сегодня:* "${getRandomPhrase()}"`, opts);
  }
});