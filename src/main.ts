import dotenv from 'dotenv'
import botkit from 'botkit'
import { Message, SlackController, SlackBot } from 'botkit'
import cron from 'cron'
import { commandOptions, botScope, messages } from './variables.js'
import { users } from './user.js'
import { getResponseAsync, getCommitRecord } from './scrape.js'
import { executeCommand } from './routes.js'
import { sendInformingMessageOmittedUser } from './message.js'
import { formatMessage } from './formatMessage'

dotenv.config()

const controller: SlackController = botkit.slackbot({})

const bot = controller.spawn({
  token: process.env.TOKEN,
})

bot.startRTM(function (err: any): void {
  if (err) {
    throw Error(err)
  }

  bot.say({
    text: messages.intro,
    channel: process.env.CHANNEL,
  })

  new cron.CronJob(
    '00 59 23 * * *',
    async () => {
      const promiseArr: any[] = users.map(getResponseAsync)
      Promise.all(promiseArr).then((resArr) => {
        const messages = resArr.map(getCommitRecord).map(formatMessage)

        if (messages) {
          messages.forEach((message) =>
            bot.say({ text: message, channel: process.env.CHANNEL }),
          )
        }
      })
    },
    null,
    true,
    'Asia/Seoul',
  )

  controller.hears(
    commandOptions,
    botScope,
    (bot: SlackBot, event: Message): void => {
      const input = event.text

      if (!input) {
        return
      }

      const command = input.split(' ').slice(0, 2).join(' ')
      const target =
        input.split(' ').length > 2 ? input?.split(' ').pop() : null

      if (!target) {
        sendInformingMessageOmittedUser(bot, event)
        return
      }

      executeCommand({ bot, event, command, target })
    },
  )
})
