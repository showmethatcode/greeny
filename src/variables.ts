interface MessageOptions {
  intro: string
  help: string
  successShowUsers: string
  successCommit: string
  failureCommit: string
  successStraightCommit: string
  successAddUser: string
  successDeleteUser: string
  userIsOmitted: string
}

export const messages: MessageOptions = {
  intro: "Hi, I'm GREENY 🌱 \nThanks for hanging out with me 🥰",
  help:
    "👉 `show users` \nShow list which includes user who's subscribed to.\n\n👉 `add user [username]` \nAdd the user into Greeny's watching list.\n\n👉 `deelte user [username]` \nDelete the user from Greeny's watching list.\n\n👉 `check commit [username]` \nSend you a message which includes information about whether the user committed or not today.\n\n",

  successShowUsers: "I'm watching you guys 👀 \n\n```{message}```",

  successCommit:
    '`{user}` succeeded to plant grass today 🥳 Beautiful GARDEN is being built 🌱',
  failureCommit: '`{user}` failed to plant grass today 😭',
  successStraightCommit:
    '`{user}` has planted grasses {number} days in a row! 🎉',

  successAddUser: '`{user}` is subscribed on my watching list 💚',
  successDeleteUser: 'Goodbye `{user}` 😭',
  userIsOmitted:
    'Please enter the user 🙏\n\n 👉 `add user well-balanced`\n👉 `delete user well-balanced`\n👉 `check commit well-balanced`',
}

export const commandOptions: string[] = [
  'show users',
  'add user',
  'delete user',
  'check commit',
  'help',
]

// Set hearing option in this Array
export const botScope: string[] = [
  'direct_message',
  'direct_mention',
  'mention',
]

export const gitHubURL: string = 'https://github.com/'
