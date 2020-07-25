import axios from 'axios'
import cheerio from 'cheerio'
import { getNumberOfDay } from './utils.js'

// These are to announce commit success or fail
export const getResponseAsync = users => {
  let promises = [];
  users.forEach(user => {
    let promise = new Promise((resolve, reject) => {
      const GitHubURL = `https://github.com/${user}`;
      let res = axios.request({
        url: GitHubURL,
        headers: {
          Cookie: 'tz=Asia%2FSeoul;',
        },
      })
      resolve(res)
    })
    promises.push(promise);
  });
  return promises;
};

export const getCounts = (responses) => {
  const counts = []
  const today = new Date().getDay();
  const todayNumber = getNumberOfDay(today);
  responses.map(res => {
    const $ = cheerio.load(res.data);
    const count = $(`g:nth-child(53) > rect:nth-child(${ todayNumber })`).attr('data-count');
    counts.push(count);
  })
  return counts
};


export const formatFailMessages = async (counts, users) => {
  const messages = [];
  let message;
  users.forEach((user, i) => {
    message = (counts[i] === 0) 
    ? `${ user } failed to plant grass today 😭` 
    : message = `${ user } succeeded to plant grass today 🥳 Beautiful GARDEN is being built 🌱`;
    messages.push(message);
  });
  return messages
};


// These are for reply personal

export const getCount = async (username) => {
  const GitHubURL = `https://github.com/${ username }`;
  const html = await axios.request({
    url: GitHubURL,
    headers: {
      Cookie: 'tz=Asia%2FSeoul;',
    },
  });
  const $ = cheerio.load(html.data);
  const today = new Date().getDay();
  const number = getNumberOfDay(today);
  const count = Number($(`g:nth-child(53) > rect:nth-child(${ number })`).attr('data-count'));
  return count;
};

export const formatMessage = async (count, username) => {
  let message;
  if (count === 0) {
    message = `${ username } has not planted grass today yet 😭 Go for it 🤗`;
  } else {
    message = `${ username } has already planted grass today 🥳 Plant more green 🌱`;
  }
  return message;
};
