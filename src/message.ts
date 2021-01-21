import { messages } from './variables.js'
import { SlackBot, Message } from 'botkit'

export function sendStraightCommitMessage(
  bot: SlackBot,
  event: Message,
  user: string,
  record: number,
): void {
  bot.reply(
    event,
    messages.successStraightCommit
      .replace('{user}', user)
      .replace('{number}', record.toString()),
  )
}

export function sendCommitSuccessMessage(
  bot: SlackBot,
  event: Message,
  user: string,
): void {
  bot.reply(event, messages.successCommit.replace('{user}', user))
}

export function sendCommitFailureMessage(
  bot: SlackBot,
  event: Message,
  user: string,
): void {
  bot.reply(event, messages.failureCommit.replace('{user}', user))
}

export function sendInformingMessageOmittedUser(
  bot: SlackBot,
  event: Message,
): void {
  bot.reply(event, messages.userIsOmitted)
}

export function sendHelpMessage(bot: SlackBot, event: Message): void {
  bot.reply(event, messages.help)
}
