import { users, showUsers, addUser, deleteUser } from './user.js'
import { checkCommit } from './scrape.js'

export const executeCommand = (botAPI, message, command, target) => {
    switch(command) {
      case 'help':
        break;
  
      case 'show users':
        showUsers(botAPI, message, users);
        break;
      
      case 'check commit':
        checkCommit(botAPI, message, target);
        break;
  
      case 'add user':
        addUser(botAPI, message, target);
        break;
  
      case 'delete user':
        deleteUser(botAPI, message, target);
        break;
    }
  }