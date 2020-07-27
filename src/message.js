import { MESSAGES } from './variables.js'

export const formatMessage = (commitInfo) => {
    const [ user, record, isCommitted ] = commitInfo
    let message

    if (isCommitted) {
        message = (record > 2) 
        ? MESSAGES.SUCCESS_STRAIGHT_COMMIT.replace('{user}', user).replace('{number}', record)
        : MESSAGES.SUCCESS_COMMIT.replace('{user}', user);
    } else {
        message = MESSAGES.FAILURE_COMMIT.replace('{user}', user);
    }

    return message
}

export const sendStraightCommitMessage = (botAPI, message, user, record) => {
    botAPI.reply(message, MESSAGES.SUCCESS_STRAIGHT_COMMIT
    .replace('{user}', user)
    .replace('{number}', record));
}

export const sendCommitSuccessMessage = (botAPI, message, user) => 
    botAPI.reply(message, MESSAGES.SUCCESS_COMMIT.replace('{user}', user))


export const sendCommitFailureMessage = (botAPI, message, user) => 
    botAPI.reply(message, MESSAGES.FAILURE_COMMIT.replace('{user}', user))

export const sendInformingMessageOmittedUser = (botAPI, message) => 
    botAPI.reply(message, MESSAGES.USER_IS_OMITTED)

export const sendHelpMessage = (botAPI, message) => 
    botAPI.reply(message, MESSAGES.HELP)