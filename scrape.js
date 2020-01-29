const axios = require('axios');
const cheerio = require('cheerio');

// It's for match between tag element and Day number
exports.convertNumber = () => {
  const date = new Date();
  let number = date.getDay();
  if (number === 7) {
    number = 0;
  } else {
    number += 1;
  }
  return number;
};

// These are to announce commit success or fail
exports.getCounts = async (users) => {
  const counts = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < users.length; i++) {
    const GitHubURL = `https://github.com/${users[i]}`;
    // eslint-disable-next-line no-await-in-loop
    const html = await axios.request({
      url: GitHubURL,
      headers: {
        Cookie: 'tz=Asia%2FSeoul;',
      },
    });
    const $ = cheerio.load(html.data);
    const number = this.convertNumber();
    const count = Number($(`g:nth-child(53) > rect:nth-child(${number})`).attr('data-count'));
    counts.push(count);
  }
  return counts;
};


exports.formatFailMessages = async (counts, users) => {
  const messages = [];
  let message;
  for (let i = 0; i < counts.length; i++) {
    if (counts[i] === 0) {
      message = `${users[i]} failed to plant grass today 😭`;
    } else {
      message = `${users[i]} succeeded to plant grass today 🥳 Beautiful GARDEN is being built 🌱`;
    }
    messages.push(message);
  }
  return messages;
};


// These are for reply personal

exports.getCount = async (username) => {
  const GitHubURL = `https://github.com/${username}`;
  const html = await axios.request({
    url: GitHubURL,
    headers: {
      Cookie: 'tz=Asia%2FSeoul;',
    },
  });
  const $ = cheerio.load(html.data);
  const number = this.convertNumber();
  const count = Number($(`g:nth-child(53) > rect:nth-child(${number})`).attr('data-count'));
  return count;
};

exports.formatCheckMessage = async (count) => {
  let message;
  if (count === 0) {
    message = ' has not planted grass today yet 😭 Go for it 🤗';
  } else {
    message = ' has already planted grass today 🥳 Plant more green 🌱';
  }
  return message;
};
