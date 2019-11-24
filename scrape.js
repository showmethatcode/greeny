require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');
const { IncomingWebhook } = require('@slack/webhook');
const url = process.env.WebhookURL;
const webhook = new IncomingWebhook(url);



Date.prototype.yyyymmdd = function() // prototype 말고 다른 함수로 고안해 만들어볼것
{
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString();
    var dd = this.getDate().toString();
 
    return yyyy + '-' + (mm[1] ? mm : '0'+mm[0]) + '-' + (dd[1] ? dd : '0'+dd[0]);
}

var today = new Date().yyyymmdd().toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul'
  });


const getTodayCommit = async() => {
    const usernames = ['clinoz', 'incleaf', 'indante']
    const storedNames = []
    const counts = []
    for (var i=0; i<usernames.length; i++){
        username = usernames[i]
        storedNames.push(username)
        const target_url = `https://github.com/${username}`
        const response = await axios.get(target_url,{
            responseType:"arraybuffer",
            headers:{
                Cookie:"tz=Asia%2FSeoul"
            }
        })
        if (response.status==200){
            const $ = cheerio.load(response.data)
            for (var x=1; x<8; x++) {
                data_date = $("g:nth-child(53) rect:nth-child("+x+")").attr("data-date")
                if (data_date==today) {
                    var count = $("g:nth-child(53) rect:nth-child("+x+")").attr("data-count")
                    console.log(count)
                    counts.push(count)
                }
            }    
        } 
    } return {
        counts: counts,
        storedNames: storedNames
    }
}


function createMessage(count){
    if (count>0){
        return ('님이 오늘 잔디를 가꾸는데 성공하셨습니다!');
    } else {
        return ('님이 오늘 잔디를 가꾸는데 실패하셨습니다.')
    }
}

getTodayCommit().then(function(todayCommit){
    for (var i=0; i<todayCommit.storedNames.length; i++){
        const name = todayCommit.storedNames[i]
        const formatMessage = createMessage(todayCommit.counts[i])
        const message = {
            "blocks": [
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "mrkdwn",
                            "text": `${name}${formatMessage}`
                        }
                    ]
                }
            ]
        }
        webhook.send(message)
    }
})