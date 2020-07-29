"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubURL = exports.botScope = exports.COMMANDS = exports.MESSAGES = void 0;
exports.MESSAGES = {
    INTRO: "Hi, I'm GREENY 🌱 \nThanks for hanging out with me 🥰",
    HELP: "👉 `show users` \nShow list which includes user who's subscribed to.\n\n👉 `add user [username]` \nAdd the user into Greeny's watching list.\n\n👉 `deelte user [username]` \nDelete the user from Greeny's watching list.\n\n👉 `check commit [username]` \nSend you a message which includes information about whether the user committed or not today.\n\n",
    SUCCESS_SHOW_USERS: "I'm watching you guys 👀 \n\n```{message}```",
    SUCCESS_COMMIT: "`{user}` succeeded to plant grass today 🥳 Beautiful GARDEN is being built 🌱",
    FAILURE_COMMIT: "`{user}` failed to plant grass today 😭",
    SUCCESS_STRAIGHT_COMMIT: "`{user}` has planted grasses {number} days in a row! 🎉",
    SUCCESS_ADD_USER: "`{user}` is subscribed on my watching list 💚",
    SUCCESS_DELETE_USER: "Goodbye `{user}` 😭",
    USER_IS_OMITTED: "Please enter the user 🙏\n\n 👉 `add user well-balanced`\n👉 `delete user well-balanced`\n👉 `check commit well-balanced`"
};
exports.COMMANDS = [
    "show users",
    "add user",
    "delete user",
    "check commit",
    "help"
];
// Set hearing option in this Array
exports.botScope = [
    "direct_message",
    "direct_mention",
    "mention",
];
exports.GitHubURL = "https://github.com/";
