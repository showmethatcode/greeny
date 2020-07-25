export const sendMessages = messages => {
    messages.forEach(message => {
      bot.say({
        text: message,
        // channel: 'bots-playground'
      })
    })
  };

export const sendReplies = usernames => {
    usernames.forEach(user => sendReply(user));
};

export const sendReply = username => {
    controller.hears(username, botScope, (botAPI, message) => {
        getCount(username)
        .then(count => formatMessage(count, username))
        .then(formattedMessage => botAPI.reply(message, formattedMessage));
    });
};

export const formatFailMessages = async (counts, users) => {
    const messages = [];
    let message;
    users.forEach((user, i) => {
      message = (counts[i] === 0) 
      ? `${ user } failed to plant grass today 😭` 
      : message = `${ user } succeeded to plant grass today 🥳 Beautiful GARDEN is being built 🌱`;
      messages.push(message);
    });
    return messages
  };