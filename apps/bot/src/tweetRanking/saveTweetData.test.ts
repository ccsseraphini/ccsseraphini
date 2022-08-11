import { Tweet, Data } from '../tweetTypes';
import saveTweetData from './saveTweetData';
import { connectMongoose } from '../../test/connectMongoose';
import { disconnectMongoose } from '../../test/disconnectMongoose';
import { clearDbAndRestartCounters } from '../../test/clearDbAndRestartCounters';

beforeAll(connectMongoose);
beforeEach(clearDbAndRestartCounters);
afterAll(disconnectMongoose);

it('should save tweet data', async () => {
  const data: Data = {
    attachments: {},
    author_id: '2244994945',
    public_metrics: {
      retweet_count: 304,
      reply_count: 152,
      like_count: 1012,
      quote_count: 117,
    },
    created_at: '2021-11-15T19:08:05.000Z',
    id: '1460323737035677698',
  };

  const tweet: Partial<Tweet> = {
    data,
  };

  const { _id } = await saveTweetData(tweet as Tweet);

  expect(_id).toBeDefined();
});