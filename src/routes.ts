import { users, showUsers, addUser, deleteUser } from './user.js'
import { SlackBot, Message } from 'botkit'
import { checkCommit } from './scrape.js'
import {
  sendStraightCommitMessage,
  sendCommitSuccessMessage,
  sendCommitFailureMessage,
  sendHelpMessage,
} from './message.js'

interface CommandParams {
  bot: SlackBot
  event: Message
  command: string
  target: string
}

export async function executeCommand({
  bot,
  event,
  command,
  target,
}: CommandParams) {
  switch (command) {
    case 'help':
      sendHelpMessage(bot, event)
      break

    case 'show users':
      showUsers(bot, event, users)
      break

    case 'check commit':
      const [user, record, isCommitted] = await checkCommit(target)
      if (record > 2) sendStraightCommitMessage(bot, event, user, record)
      else if (isCommitted) sendCommitSuccessMessage(bot, event, user)
      else sendCommitFailureMessage(bot, event, user)
      break

    case 'add user':
      addUser(bot, event, target)
      break

    case 'delete user':
      deleteUser(bot, event, target)
      break
  }
}
