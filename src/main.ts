import dotenv from 'dotenv'
import botkit from 'botkit'
import cron from 'cron'
import { COMMANDS, botScope } from './variables.js'
import { users } from './user.js'
import { getResponseAsync, getCommitRecord } from './scrape.js'
import { executeCommand } from './routes.js'
import { formatMessage } from './message.js'

dotenv.config()

const controller = botkit.slackbot();

export const bot = controller.spawn({
  retry: true,
  token: process.env.TOKEN,
});


bot.startRTM((err) => {
  if (err) {
    throw Error('Failed to start RTM');
  }

  bot.say({
    // text: MESSAGES.INTRO,
    channel: process.env.CHANNEL
  })

new cron.CronJob('00 59 23 * * *', async () => {
  const promiseArr = users.map(getResponseAsync)
  Promise.all(promiseArr)
  .then(resArr => {
      const messages = resArr
      .map(getCommitRecord)
      .map(formatMessage)

      if (messages) {
        messages.forEach(message => bot.say({text: message, channel: process.env.CHANNEL}));
      }
  });
}, null, true, 'Asia/Seoul');
  

controller.hears(COMMANDS, botScope, (botAPI, message) => {
  const input = message.text
  const command = input.split(' ').slice(0, 2).join(' ')
  const target = input.split(' ').length > 2 ? input.split(' ').pop() : false
  executeCommand(botAPI, message, command, target)
  })
});