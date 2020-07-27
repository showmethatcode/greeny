import { users, showUsers, addUser, deleteUser } from './user.js'
import { checkCommit } from './scrape.js'
import { sendStraightCommitMessage, sendCommitSuccessMessage, 
  sendCommitFailureMessage, sendInformingMessageOmittedUser } from './message.js'

export const executeCommand = (botAPI, message, command, target) => {
    switch(command) {
      case 'help':
        sendHelpMessage(botAPI, message)
        break;
  
      case 'show users':
        showUsers(botAPI, message, users);
        break;
      
      case 'check commit':
        if (!target) {
          sendInformingMessageOmittedUser(botAPI, message);
          break
        }

        const user, record, isCommitted = checkCommit(target);
        if (record > 2) sendStraightCommitMessage(botAPI, message, user, record);
        else if (isCommitted) sendCommitSuccessMessage(botAPI, message, user);
        else sendCommitFailureMessage(botAPI, message, user);
        break;
  
      case 'add user':
        addUser(botAPI, message, target);
        break;
  
      case 'delete user':
        deleteUser(botAPI, message, target);
        break;
    }
  }