
import { MESSAGES } from './variables.js'

export let users = [];

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
        botAPI.reply(message, MESSAGES.SUCCESS_DELETE_USER)
    } else {
        botAPI.reply(message, MESSAGES.USER_IS_OMITTED)
    }
}