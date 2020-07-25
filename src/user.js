
import { MESSAGES } from './variables.js'

export let users = [];

export const showUsers = (botAPI, message, users) => {
    (users.length > 0)
        ? botAPI.reply(message, MESSAGES.SUCCESS_SHOW_USERS.replace('{message}', users.join('\n')))
        : botAPI.reply(message, MESSAGES.USER_IS_OMITTED)
}

export const addUser = (botAPI, message, user) => {
    if (user) {
        users.push(user);
        botAPI.reply(message, MESSAGES.SUCCESS_ADD_USER.replace('{user}', user))
    } else {
        botAPI.reply(message, MESSAGES.USER_IS_OMITTED)
    }
}

export const deleteUser = (botAPI, message, user) => {
    if (user) {
        users.splice(users.indexOf(user), 1);
        botAPI.reply(message, MESSAGES.SUCCESS_DELETE_USER.replace('{user}', user))
    } else {
        botAPI.reply(message, MESSAGES.USER_IS_OMITTED)
    }
}