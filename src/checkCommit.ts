import { getResponseAsync, getCommitRecord } from './scrape';

export const checkCommit = async (user) => {
  const res = await getResponseAsync(user);
  return getCommitRecord(res);
};
