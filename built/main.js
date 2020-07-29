"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var botkit_1 = __importDefault(require("botkit"));
var cron_1 = __importDefault(require("cron"));
var variables_js_1 = require("./variables.js");
var user_js_1 = require("./user.js");
var scrape_js_1 = require("./scrape.js");
var routes_js_1 = require("./routes.js");
var message_js_1 = require("./message.js");
dotenv_1.default.config();
var controller = botkit_1.default.slackbot();
exports.bot = controller.spawn({
    retry: true,
    token: process.env.TOKEN,
});
exports.bot.startRTM(function (err) {
    if (err) {
        throw Error('Failed to start RTM');
    }
    exports.bot.say({
        // text: MESSAGES.INTRO,
        channel: process.env.CHANNEL
    });
    new cron_1.default.CronJob('00 59 23 * * *', function () { return __awaiter(void 0, void 0, void 0, function () {
        var promiseArr;
        return __generator(this, function (_a) {
            promiseArr = user_js_1.users.map(scrape_js_1.getResponseAsync);
            Promise.all(promiseArr)
                .then(function (resArr) {
                var messages = resArr
                    .map(scrape_js_1.getCommitRecord)
                    .map(message_js_1.formatMessage);
                if (messages) {
                    messages.forEach(function (message) { return exports.bot.say({ text: message, channel: process.env.CHANNEL }); });
                }
            });
            return [2 /*return*/];
        });
    }); }, null, true, 'Asia/Seoul');
    controller.hears(variables_js_1.COMMANDS, variables_js_1.botScope, function (botAPI, message) {
        var input = message.text;
        var command = input.split(' ').slice(0, 2).join(' ');
        var target = input.split(' ').length > 2 ? input.split(' ').pop() : false;
        routes_js_1.executeCommand(botAPI, message, command, target);
    });
});
