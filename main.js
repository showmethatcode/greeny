require('dotenv').config();
const { CronJob } = require('cron');
const botkit = require('botkit');

const controller = botkit.slackbot(
  {
    debug: false,
    log: true,
  },
);
const bot = controller.spawn({
  retry: true,
  token: process.env.TOKEN,
});
const scrape = require('./scrape');

// Set hearing option in this Array
const botScope = [
  'direct_message',
  'direct_mention',
  'mention',
// 'ambient'
];

// Add User in this Array
const users = [
  'well-balanced',
  'indante',
  'incleaf',
  'tkdals5429',
];

const sendMessages = async (messages) => {
  for (let i = 0; i < messages.length; i++) {
    bot.say({
      text: messages[i],
      channel: 'bots-playground',
    });
  }
};

const sendReplyPersonal = (username) => {
  controller.hears(username, botScope, (botAPI, message) => {
    scrape.getCount(username)
      .then((count) => scrape.formatCheckMessage(count))
      .then((formattedMessage) => botAPI.reply(message, formattedMessage));
  });
};

const sendReply = (usernames) => {
  usernames.forEach((user) => sendReplyPersonal(user));
};

// execute function
// Time Setting : ex) 00 00 00 * * 1-5 : every Mon ~ Fri
// eslint-disable-next-line no-new
new CronJob('00 59 23 * * *', async () => {
  scrape.getCounts(users)
    .then((counts) => scrape.formatFailMessages(counts, users))
    .then((messages) => {
      sendMessages(messages);
    });
}, null, true, 'Asia/Seoul');

sendReply(users);

bot.startRTM((err) => {
  if (err) {
    throw Error('Failed to start RTM');
  }
  bot.say({
    text: 'Greeny works!',
    channel: 'bots-playground',
  });
});
