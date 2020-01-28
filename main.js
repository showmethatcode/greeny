require('dotenv').config();
const cronJob = require('cron').CronJob;
const botkit = require('botkit');
const controller = botkit.slackbot({
	debug: false,
	log: true
});
const bot = controller.spawn({
    retry: true,
	token: process.env.TOKEN
    });
const scrape = require('./scrape');

// Set hearing option in this Array
const botScope = [
    'direct_message',
    'direct_mention',
    'mention',
   // 'ambient'
];

// Add User in this Array
const users = [
    'well-balanced',
    'indante',
    'incleaf',
    'tkdals5429',
];

const sendMessages = async(messages) => {
    for (var i = 0; i < messages.length; i++) {
        bot.say({
            text:messages[i],
            channel: 'bots-playground'
        })
    }
};

const sendReplyPersonal = (username) => {
    controller.hears(username,botScope, (bot,message)=>{
        scrape.getCount(username)
        .then(count => {
            return scrape.formatCheckMessage(count)
        })
        .then(formattedMessage => {
            bot.reply(message,formattedMessage)
        })
    })
};

const sendReply = (usernames) => {
    usernames.forEach((user) => {
        sendReplyPersonal(user)
    })
};

// excute function
// Time Setting : ex) 00 00 00 * * 1-5 : every Mon ~ Fri
new cronJob('00 00 00 * * *',async()=>{
    scrape.getCounts(users)
    .then(counts => {
    return scrape.formatFailMessages(counts,users)
    })
    .then(messages => {
        sendMessages(messages)
    })
},null,true,"Asia/Seoul")

sendReply(users);

bot.startRTM(function(err){
    if (err) {
        console.log('Failed to start RTM');
        return setTimeout(start)
    }
    bot.say({
    text: 'Greeny works!',
    channel: 'bots-playground'
    })
});
