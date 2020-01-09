const axios = require('axios');
const cheerio = require('cheerio');

// It's for match between tag element and Day number
exports.convertNumber = () => {
    var date = new Date;
    var number = date.getDay()
    if (number===7) {
        number = 0
    } else {
        number += 1;
    }
    return number
}

// These are to announce commit success or fail
exports.getCounts = async(users) => {
    var counts = [];
    for (var i=0; i<users.length; i++) {
        let GitHubURL = `https://github.com/${users[i]}`;
        let html = await axios.request({
            url: GitHubURL,
            headers:{
                Cookie: "tz=Asia%2FSeoul;"
            }
        });
        let $ = cheerio.load(html.data);
        let number = this.convertNumber();
        let count = $(`g:nth-child(53) > rect:nth-child(${number})`).attr("data-count");
        counts.push(count)
    }
    return await counts
}


exports.formatFailMessages = async(counts,users) => {
    var messages = [];
    for (var i = 0; i<counts.length; i++) {
        if (counts[i] == 0) {
            message = users[i] + ' failed to plant glass today 😭';
            // message = users[i] + '님이 잔디 심기에 실패하셨습니다 😭 우리 조금만 더 힘내봐요 🤗';
        } else {
            message = users[i] + ' successed to plant glass today 🥳 Beautiful GARDEN is being built 🌱';
            // message = users[i] + '님이 잔디 심기에 성공하셨습니다! 🥳 예쁜 정원이 만들어지는 중 🌱';
        }
        messages.push(message)
    }
    return await messages
}


// These are for reply personal

exports.getCount = async(username) => {
    let GitHubURL = `https://github.com/${username}`;
    let html = await axios.request({
        url: GitHubURL,
        headers:{
            Cookie: "tz=Asia%2FSeoul;"
        }
    });
    let $ = cheerio.load(html.data);
    let number = this.convertNumber();
    let count = $(`g:nth-child(53) > rect:nth-child(${number})`).attr("data-count");
    return await count
}

exports.formatCheckMessage = async(count) => {
        if (count == 0) {
            message = ' have not planted glass today yet 😭 Go for it 🤗';
            // message = '아직 잔디를 심지 않으셨어요 😭 우리 조금만 더 힘내봐요 🤗';
        } else {
            message = ' have already planted glass today 🥳 Plant more green 🌱';
            // message = '잔디를 심으셨군요 🥳 초록초록하게 더 심어주세요 🌱';
        }
    return await message
}