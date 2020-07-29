"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendHelpMessage = exports.sendInformingMessageOmittedUser = exports.sendCommitFailureMessage = exports.sendCommitSuccessMessage = exports.sendStraightCommitMessage = exports.formatMessage = void 0;
var variables_js_1 = require("./variables.js");
exports.formatMessage = function (commitInfo) {
    var user = commitInfo[0], record = commitInfo[1], isCommitted = commitInfo[2];
    var message;
    if (isCommitted) {
        message = (record > 2)
            ? variables_js_1.MESSAGES.SUCCESS_STRAIGHT_COMMIT.replace('{user}', user).replace('{number}', record)
            : variables_js_1.MESSAGES.SUCCESS_COMMIT.replace('{user}', user);
    }
    else {
        message = variables_js_1.MESSAGES.FAILURE_COMMIT.replace('{user}', user);
    }
    return message;
};
exports.sendStraightCommitMessage = function (botAPI, message, user, record) {
    botAPI.reply(message, variables_js_1.MESSAGES.SUCCESS_STRAIGHT_COMMIT
        .replace('{user}', user)
        .replace('{number}', record));
};
exports.sendCommitSuccessMessage = function (botAPI, message, user) {
    return botAPI.reply(message, variables_js_1.MESSAGES.SUCCESS_COMMIT.replace('{user}', user));
};
exports.sendCommitFailureMessage = function (botAPI, message, user) {
    return botAPI.reply(message, variables_js_1.MESSAGES.FAILURE_COMMIT.replace('{user}', user));
};
exports.sendInformingMessageOmittedUser = function (botAPI, message) {
    return botAPI.reply(message, variables_js_1.MESSAGES.USER_IS_OMITTED);
};
exports.sendHelpMessage = function (botAPI, message) {
    return botAPI.reply(message, variables_js_1.MESSAGES.HELP);
};
