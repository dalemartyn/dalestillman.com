require('dotenv').config();

const Twitter = require('twitter');
const write_file = require('../../utils/write-file');
const util = require('util');
const process_tweet = require('./process-tweet');

const twitter_client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const params = {
  screen_name: 'dalestillmane',
  count: 200,
  tweet_mode: 'extended'
};

const get = util.promisify(twitter_client.get);
const get_timeline = get.bind(twitter_client, 'statuses/user_timeline', params);
const get_likes = get.bind(twitter_client, 'favorites/list', params);

async function save_timeline() {
  const data = await get_timeline();
  const filtered = data.filter(function (tweet) {
    return !tweet.in_reply_to_user_id;
  });
  const tweets = filtered.map(function(tweet) {
    let type;
    if (tweet.retweeted) {
      tweet = tweet.retweeted_status;
      type = "retweet";
    } else {
      type = "tweet";
    }
    return process_tweet(tweet, type);
  });
  await write_file('./src/_data/twitter_timeline.json', JSON.stringify(tweets, null, 2));
  console.log('saved twitter timeline');
}

async function save_likes() {
  const data = await get_likes();
  const tweets = data.map(function (tweet) {
    let type = "like";
    return process_tweet(tweet, type);
  });
  write_file('./src/_data/twitter_likes.json', JSON.stringify(tweets, null, 2));
  console.log('saved twitter likes');
}

async function save_twitter_data() {
  return Promise.all([save_timeline(), save_likes()]);
}

module.exports = {
  save_twitter_data
};
