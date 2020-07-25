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