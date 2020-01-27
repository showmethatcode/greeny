# Hello, Greeny
Greeny helps you to create your own garden on GitHub 💚

<img width="634" alt="스크린샷 2020-01-09 21 02 44" src="https://user-images.githubusercontent.com/48206623/72066249-6b94b080-3323-11ea-9368-1d6b680132a8.png">

## Chnage log

#### 2019.11.22
- Green was born !
- Greeny learned how to scrape your commit count :)

#### 2019.11.25
- successly complete to make 'Greeny' MVP

#### 2019.12.3
- Greeny can be heard your message!

#### 2020.1.9
- Greeny's codes were arranged !

## Getting Started

1. Create a new [bot integration](https://showmethatcode.slack.com/apps/new/A0F7YS25R-bots)
2. Copy API Token
3. Add your `bot` in your Slack Channel

## Usage

##### Install modules
```
npm install
```

##### Create environment variable file
```
touch .env
vim .env
```

##### Enter your Bot API Token in `.env`
>Don't include  Square brackets
```
TOKEN=[your Bot API Token]
```



`main.js`

##### Set Hearing option in this Array
```js
const botScope = [
    'direct_message',
    'direct_mention',
    'mention',
    'ambient'
];
```

##### Add User in this Array
> Absolutely you can reset these users
```js
const users = [
    'well-balanced',
    'indante',
    'incleaf'
];
```

##### Set Time and your Timezone
> ex) 00 30 15 * * 1-5: PM 3:15 every Mon ~ Fri 
```js
new cronJob('00 00 00 * * *',async()=>{
    scrape.getCounts(users)
    .then(counts => {
    return scrape.formatFailMessages(counts,users)
    })
    .then(messages => {
        sendMessages(messages)
    })
},null,true,"Asia/Seoul")
```

##### Set your Channel Name
```js
bot.startRTM(function(){
    bot.say({
    text: 'Greeny works!',
    channel: 'bots-playground'
    })
});
```

##### If you don't like message, you can change in `scrape.js`



```
npm start
```

## Dependencies
- [Botkit](https://botkit.ai/)
- [Axios](https://github.com/axios/axios)
- [Cheerio](https://github.com/cheeriojs/cheerio)
- [Cron](https://www.npmjs.com/package/cron)
- [Dotenv](https://www.npmjs.com/package/dotenv)
