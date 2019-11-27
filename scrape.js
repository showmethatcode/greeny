require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');
const { IncomingWebhook } = require('@slack/webhook');
const url = process.env.WebhookURL;
const webhook = new IncomingWebhook(url);
const schedule = require('node-schedule')



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
    const usernames = ['we-me', 'incleaf', 'indante']
    const storedNames = []
    const counts = []
    const target_urls = []
    for (var i=0; i<usernames.length; i++){
        username = usernames[i]
        storedNames.push(username)
        const target_url = `https://github.com/${username}`
        target_urls.push(target_url)
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
        storedNames: storedNames,
        target_urls: target_urls
    }
}


function createMessage(count){
    if (count>0){
        return ('님이 잔디 심기에 성공하셨습니다! 🥳 예쁜 정원이 만들어지는 중 🌱');
    } else if (count==0){
        return ('님이 잔디 심기에 실패하셨습니다 😭 우리 조금만 더 힘내봐요 🤗')
    }
}


schedule.scheduleJob('00 00 * * *',async()=>
        await getTodayCommit().then(function(todayCommit){
            for (var i=0; i<todayCommit.storedNames.length; i++){
                const name = todayCommit.storedNames[i]
                const url = todayCommit.target_urls[i]
                const formattedMessage = createMessage(todayCommit.counts[i])
                const message = {
                    "blocks": [
                        {
                            "type": "context",
                            "elements": [
                                {
                                    "type": "mrkdwn",
                                    "text": `*<${url}|${name}>${formattedMessage}*`
                                }
                            ]
                        }
                    ]
                }
                webhook.send(message)
            }
        })
)

schedule.scheduleJob('00 22 * * *',async()=>
    await getTodayCommit().then(function(todayCommit){
            for (var i=0; i<todayCommit.storedNames.length; i++){
                const name = todayCommit.storedNames[i]
                const url = todayCommit.target_urls[i]
                const formattedMessage = createMessage(todayCommit.counts[i])
                if (todayCommit.counts[i]==0){
                    const message2 = {
                        "blocks": [
                            {
                                "type": "context",
                                "elements": [
                                    {
                                        "type": "mrkdwn",
                                        "text": `*<${url}|${name}>님은 아직 정원을 가꾸지 못하셨어요. 시간이 얼마 남지 않았답니다 😭*`
                                   }
                                ]
                          }
                       ]
                    }
                    webhook.send(message2)
              }
         }
    })
)