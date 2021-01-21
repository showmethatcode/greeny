import { getResponseAsync, getCommitRecord } from './scrape'

export const checkCommit = async (user: string) => {
  const res = await getResponseAsync(user)
  return getCommitRecord(res)
}
