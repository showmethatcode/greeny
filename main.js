import dotenv from 'dotenv'
import cron from 'cron'
import botkit from 'botkit'
import { getCount, getCounts, formatMessage, formatFailMessages, getResponseAsync } from './scrape.js'
import { COMMANDS, botScope, MESSAGES } from './variables.js'
import { users, addUser, deleteUser } from './user.js'

dotenv.config()

const controller = botkit.slackbot();

const bot = controller.spawn({
  retry: true,
  token: process.env.TOKEN,
});

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

// Promise.all(getResponseAsync(users))
// .then(getCounts)
// .then(messages => {
//   sendMessages(messages)
// });

// sendReply(users);

const executeCommand = (botAPI, message, command, target) => {
  switch(command) {
    case 'show users':
      botAPI.reply(message, users.join('\n'))
      break;
    
    case 'show user':
      showUser(botAPI, message, target)
      break;

    case 'add user':
      addUser(botAPI, message, target);
      break;

    case 'delete user':
      deleteUser(botAPI, message, target);
      break;
  }
}


bot.startRTM((err) => {
  if (err) {
    throw Error('Failed to start RTM');
  }

  bot.say({
    text: MESSAGES.INTRO,
    channel: process.env.CHANNEL,
  })

  controller.hears(COMMANDS, botScope, (botAPI, message) => {
    const input = message.text
    const command = input.split(' ').slice(0, 2).join(' ')
    const target = input.split(' ').length === 3 ? input.split(' ').pop() : false
    executeCommand(botAPI, message, command, target)
  })
});