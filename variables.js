export const MESSAGES = {
    INTRO: `Hi, I'm GREENY 🌱 \nThanks for hanging out with me 🥰`,

    SUCCESS_COMMIT: '`{user}` succeeded to plant grass today 🥳 Beautiful GARDEN is being built 🌱',
    FAILURE_COMMIT: '`{user}` failed to plant grass today 😭',
    SUCCESS_STRAIGHT_COMMIT: `{user} has planted grasses {number} days in a row! 🎉`,

    SUCCESS_ADD_USER: '`{user}` is added into list 😆',
    SUCCESS_DELETE_USER: '`{user}` is deleted in list 😆',
    USER_IS_OMITTED: 'Please enter the user 🙏\n\n 👉 `add user well-balanced`\n👉 `delete user well-balanced`'
}

export const COMMANDS = [
    'show users',
    'show user',
    'add user',
    'delete user',
];

// Set hearing option in this Array
export const botScope = [
    'direct_message',
    'direct_mention',
    'mention',
  ];