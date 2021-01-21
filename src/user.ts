import { messages } from './variables.js'
import { SlackBot, Message } from 'botkit'

export let users: string[]

export function showUsers(
  botAPI: SlackBot,
  message: Message,
  users: string[],
): void {
  users.length > 0
    ? botAPI.reply(
        message,
        messages.successShowUsers.replace('{message}', users.join('\n')),
      )
    : botAPI.reply(message, messages.userIsOmitted)
}

export function addUser(
  botAPI: SlackBot,
  message: Message,
  user: string,
): void {
  if (user) {
    users.push(user)
    botAPI.reply(message, messages.successAddUser.replace('{user}', user))
  } else {
    botAPI.reply(message, messages.userIsOmitted)
  }
}

export function deleteUser(
  botAPI: SlackBot,
  message: Message,
  user: string,
): void {
  if (user) {
    users.splice(users.indexOf(user), 1)
    botAPI.reply(message, messages.successDeleteUser.replace('{user}', user))
  } else {
    botAPI.reply(message, messages.userIsOmitted)
  }
}
