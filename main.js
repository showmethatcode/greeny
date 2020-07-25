import dotenv from 'dotenv'
import cron from 'cron'
import botkit from 'botkit'
import { getCount, getCounts, formatMessage, formatFailMessages, getResponseAsync } from './scrape.js'
import { COMMANDS, channels } from './variables.js'

dotenv.config()

const controller = botkit.slackbot();

const bot = controller.spawn({
  retry: true,
  token: process.env.TOKEN,
});

// Set hearing option in this Array
const botScope = [
  'direct_message',
  'direct_mention',
  'mention',
];

// Add User in this Array
// const users = [
//   'well-balanced',
//   'indante',
//   'incleaf',
//   'tkdals5429',
// ];

let users = ['well-balanced']

const sendMessages = messages => {
  messages.forEach(message => {
    bot.say({
      text: message,
      // channel: 'bots-playground'
    })
  })
};

const sendReplyPersonal = username => {
  controller.hears(username, botScope, (botAPI, message) => {
    getCount(username)
    .then(count => formatMessage(count, username))
    .then(formattedMessage => botAPI.reply(message, formattedMessage));
  });
};

const sendReply = usernames => {
  usernames.forEach(user => sendReplyPersonal(user));
};

// execute function
// Time Setting : ex) 00 00 00 * * 1-5 : every Mon ~ Fri
// eslint-disable-next-line no-new
// new cron.CronJob('00 59 23 * * *', async () => {
//   getCounts(users)
//   .then(counts => formatFailMessages(counts, users))
//   .then(messages => {
//     sendMessages(messages);
//   });
// }, null, true, 'Asia/Seoul');

Promise.all(getResponseAsync(users))
.then(getCounts)
.then(messages => {
  sendMessages(messages)
});

// sendReply(users);


bot.startRTM((err) => {
  if (err) {
    throw Error('Failed to start RTM');
  }

  bot.say({
    text: 'Greeny works!',
    channel: channels,
  })

  controller.hears(COMMANDS, botScope, (botAPI, message) => {
    console.log(message)
  })
});