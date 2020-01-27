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
        } else {
            message = users[i] + ' succeeded to plant glass today 🥳 Beautiful GARDEN is being built 🌱';
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
        } else {
            message = ' have already planted glass today 🥳 Plant more green 🌱';
        }
    return await message
}