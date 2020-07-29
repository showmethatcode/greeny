"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.addUser = exports.showUsers = exports.users = void 0;
var variables_js_1 = require("./variables.js");
exports.users = [];
exports.showUsers = function (botAPI, message, users) {
    (users.length > 0)
        ? botAPI.reply(message, variables_js_1.MESSAGES.SUCCESS_SHOW_USERS.replace('{message}', users.join('\n')))
        : botAPI.reply(message, variables_js_1.MESSAGES.USER_IS_OMITTED);
};
exports.addUser = function (botAPI, message, user) {
    if (user) {
        exports.users.push(user);
        botAPI.reply(message, variables_js_1.MESSAGES.SUCCESS_ADD_USER.replace('{user}', user));
    }
    else {
        botAPI.reply(message, variables_js_1.MESSAGES.USER_IS_OMITTED);
    }
};
exports.deleteUser = function (botAPI, message, user) {
    if (user) {
        exports.users.splice(exports.users.indexOf(user), 1);
        botAPI.reply(message, variables_js_1.MESSAGES.SUCCESS_DELETE_USER.replace('{user}', user));
    }
    else {
        botAPI.reply(message, variables_js_1.MESSAGES.USER_IS_OMITTED);
    }
};
