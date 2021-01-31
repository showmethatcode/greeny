import dotenv from 'dotenv'
import botkit from 'botkit'
import { Message, SlackController, SlackBot } from 'botkit'
import cron from 'cron'
import { commandOptions, botScope, messages, cronExpression } from './variables.js'
import { users } from './user.js'
import { getResponseAsync, getCommitRecord, ScrapeResponse } from './scrape.js'
import { executeCommand } from './routes.js'
import { sendInformingMessageOmittedUser } from './message.js'
import { formatMessage } from './formatMessage'

dotenv.config()

const controller: SlackController = botkit.slackbot({})

const bot = controller.spawn({
  token: process.env.TOKEN,
})

bot.startRTM((err) => {
  if (err) {
    throw Error(err)
  }

  bot.say({
    text: messages.intro,
    channel: process.env.CHANNEL,
  })

  new cron.CronJob(
    cronExpression,
    async () => {
      const promiseArr: Promise<ScrapeResponse>[] = users.map(getResponseAsync)
      Promise.all(promiseArr).then(resArr => {
        const messages: string[] = resArr.map(getCommitRecord).map(formatMessage)

        if (messages) {
          messages.forEach(message =>
            bot.say({ text: message, channel: process.env.CHANNEL }),
          )
        }
      })
    },
    null,
    true,
    process.env.TIMEZONE,
  )

  controller.hears(
    commandOptions,
    botScope,
    (bot: SlackBot, event: Message): void => {
      const input: string | undefined = event.text

      if (!input) {
        return
      }

      const command = input.split(' ').slice(0, 2).join(' ')
      const target = input.split(' ').length > 2 ? input?.split(' ').pop() : null

      if (!target) {
        sendInformingMessageOmittedUser(bot, event)
        return
      }

      executeCommand({ bot, event, command, target })
    },
  )
})
