import axios from 'axios'
import cheerio from 'cheerio'
import { getNumberOfDay, getTimezoneCookie } from './utils.js'
import { GitHubURL, MESSAGES } from './variables.js'
import dotenv from 'dotenv'

dotenv.config()

const getCommitRecord = (res) => {
  const $ = cheerio.load(res.data);

  let record = 0
  for (let i = 1; i < 54; i++) {
    for (let j = 1; j < 8; j++) {
      const count = $(`g:nth-child(${i}) > rect:nth-child(${j})`).attr('data-count');
      if (count == undefined) break
      else record = (count > 0) ? record + 1 : 0
    }
  }

  return [
    record,
    (record > 0) ? true : false
  ]
}

export const checkCommit = (botAPI, message, user) => {
  user
  ? getResponseAsync(user)
    .then(res => {
      const [ record, isCommitted ] = getCommitRecord(res);
      if (record > 2) {
        botAPI.reply(message, MESSAGES.SUCCESS_STRAIGHT_COMMIT
        .replace('{user}', user)
        .replace('{number}', record))
      } 
      else if (isCommitted) botAPI.reply(message, MESSAGES.SUCCESS_COMMIT.replace('{user}', user))
      else botAPI.reply(message, MESSAGES.FAILURE_COMMIT.replace('{user}', user))
    })

  : botAPI.reply(message, MESSAGES.USER_IS_OMITTED)
}

export const getResponseAsync = user => {
  const promise = new Promise((resolve, reject) => {
    const url = GitHubURL + user
    let res = axios.get(url, {
      withCredentials: true,
      headers: {
        Cookie: getTimezoneCookie(process.env.TIMEZONE),
      },
    })
    resolve(res)
  });
  
  return promise;
};

// These are to announce commit success or fail
// export const getResponseAsync = users => {
//   let promises = [];
//   users.forEach(user => {
//     let promise = new Promise((resolve, reject) => {
//       let res = axios.request({
//         url: GitHubURL + user,
//         headers: {
//           Cookie: 'tz=Asia%2FSeoul;',
//         },
//       })
//       resolve(res)
//     })
//     promises.push(promise);
//   });
//   return promises;
// };

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

export const getCount = async (user) => {
  const html = await axios.request({
    url: GitHubURL + user,
    headers: {
      Cookie: getTimezoneCookie(process.env.TIMEZONE),
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
