import axios from 'axios'
import cheerio from 'cheerio'
import { getTimezoneCookie } from './utils.js'
import { gitHubURL } from './variables.js'
import dotenv from 'dotenv'

dotenv.config()

export interface ScrapeResponse {
  data: any
}

export async function checkCommit(user: string): Promise<any[]> {
  const res = await getResponseAsync(user)
  return getCommitRecord(res)
}

export function getResponseAsync(user: string): Promise<ScrapeResponse> {
  return new Promise(async (resolve, reject) => {
    const url = gitHubURL + user
    const response = await axios.get<ScrapeResponse>(url, {
      withCredentials: true,
      headers: {
        Cookie: getTimezoneCookie(process.env.TIMEZONE),
      },
    })
    resolve(response)
  })
}

export function getCommitRecord(res: ScrapeResponse): any[] {
  const $: cheerio.Root = cheerio.load(res.data)
  const user: string = $(`span.p-nickname.vcard-username.d-block`).text()
  let record: number = 0
  for (let i = 1; i < 54; i++) {
    for (let j = 1; j < 8; j++) {
      const count = $(`g:nth-child(${i}) > rect:nth-child(${j})`).attr(
        'data-count',
      )
      if (count == undefined) break
      else record = parseInt(count, 10) > 0 ? record + 1 : 0
    }
  }

  return [
    user,
    record,
    record > 0 ? true : false
  ]
}
