import axios from 'axios'
import cheerio from 'cheerio'
import { getTimezoneCookie } from './utils.js'
import { GitHubURL, MESSAGES } from './variables.js'
import dotenv from 'dotenv'

dotenv.config()

export const getCommitRecord = (res) => {
  const $ = cheerio.load(res.data);
  const user = $(`span.p-nickname.vcard-username.d-block`).text()
  let record = 0
  for (let i = 1; i < 54; i++) {
    for (let j = 1; j < 8; j++) {
      const count = $(`g:nth-child(${i}) > rect:nth-child(${j})`).attr('data-count');
      if (count == undefined) break
      else record = (count > 0) ? record + 1 : 0
    }
  }

  return [
    user,
    record,
    (record > 0) ? true : false
  ]
}

export const checkCommit = (botAPI, message, user) => {
  (user)
  ? getResponseAsync(user)
    .then(res => {
      const [ user, record, isCommitted ] = getCommitRecord(res);
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