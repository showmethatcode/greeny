import { messages } from './variables.js'

export function formatMessage(commitInfo: any[]): string {
  const [user, record, isCommitted] = commitInfo
  let message: string

  if (isCommitted) {
    message =
      record > 2
        ? messages.successStraightCommit
          .replace('{user}', user)
          .replace('{number}', record.toString())
        : messages.successCommit.replace('{user}', user)
  } else {
    message = messages.failureCommit.replace('{user}', user)
  }

  return message
}
