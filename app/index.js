const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const sourceZavet = fs.readFileSync('./source/zavet.txt', 'utf-8');
const sourceTagil = fs.readFileSync('./source/tagil.txt', 'utf-8');
const sourceBali = fs.readFileSync('./source/bali.txt', 'utf-8');
const sourceWP = fs.readFileSync('./source/wp.txt', 'utf-8');

const devToken = '6003667782:AAE-Ab-j0KFtCMyDi-WcxVOtk3pwfdSYWOk';

const token = process.env.BOT_TOKEN || devToken;

const bot = new TelegramBot(token, {polling: true});

const zavet = ['завет'];
const tagil = ['кринж', 'срам'];
const bali = ['бали', 'отпуск', 'отдых', 'эвфемизм', 'устал', 'заебал', 'ебал'];
const wp = ['дыхание маткой', 'женская энергия', 'тренинг', 'лев'];

const isMentioned = (arrToCheck, msg) => {
  const phraseToCheck = msg.text.toString().toLowerCase();
  return arrToCheck.some(word => phraseToCheck.includes(word));
}

const textArray = source => source.split('. ');

const getRandomPhrase = (source) => source[Math.floor(Math.random()*source.length)].trim();

const groupId = '-1001499183461';
const testGroupId = '-1001652694885';

const groupsIds = [groupId, testGroupId];

bot.on('message', (msg) => {
  const opts = {
    parse_mode: 'Markdown'
  };

  if(msg.chat.type !== 'private' && groupsIds.indexOf(msg.chat.id.toString()) === -1) return;

  if (isMentioned(zavet, msg)) {
    bot.sendMessage(msg.chat.id, `*Вы помянули Завет всуе. Получайте предсказание на сегодня:* «${getRandomPhrase(textArray(sourceZavet))}»`, opts);
  }

  if (isMentioned(tagil, msg)) {
    bot.sendMessage(msg.chat.id, `*Тем временем в Тагиле:* «${getRandomPhrase(textArray(sourceTagil))}»`, opts);
  }

  if (isMentioned(bali, msg)) {
    bot.sendMessage(msg.chat.id, `*Устали? Вам путевка на Бали! Море шепчет:* «${getRandomPhrase(textArray(sourceBali))}»`, opts);
  }

  if (isMentioned(wp, msg)) {
    bot.sendMessage(msg.chat.id, `*Качаем женскую энергию, девочки! Совет от коуча:* «${getRandomPhrase(textArray(sourceWP))}»`, opts);
  }

});