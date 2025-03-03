import { JobCallback } from 'node-schedule';

import getRankedTweets from './getRankedTweets';
import saveRankedTweets from './saveRankedTweets';
import deleteTemporaryTweets from './deleteTemporaryTweets';
import postTweetRanking from './postTweetRanking';

const tweetRanking = (since: Date, until: Date = new Date()) => {
  const execute: JobCallback = async () => {
    try {
      const rankedTweets = await getRankedTweets(since);
      if (!rankedTweets?.length) {
        console.info('Unable to calculate tweet ranking');
        return;
      }

      try {
        await saveRankedTweets(rankedTweets);
        await deleteTemporaryTweets(since, until);
      } catch (error) {
        console.error('Fail to save ranked tweets', error);
        console.info("Temporary tweets wasn't deleted");
      }
    } catch (error) {
      console.error('Fail to calculate tweet ranking', error);
    }

    try {
      await postTweetRanking(until);
    } catch (error) {
      console.error('Fail to handle ranking', error);
    }
  };

  return execute;
};

export default tweetRanking;
