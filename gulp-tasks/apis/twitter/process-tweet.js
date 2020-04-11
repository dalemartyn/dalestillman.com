const moment = require('moment');
const twitterText = require('twitter-text');

function processTweet(tweet, type) {
  return {
    "text": autoParagraph(linkedText(tweet)),
    "type": type,
    "iso_time": isoTime(tweet.created_at),
    "human_time": humanTime(tweet.created_at),
    "user": {
      "name": tweet.user.name,
      "screen_name": tweet.user.screen_name
    },
    "id_str": tweet.id_str
  }
}

function humanTime(time) {
  const m = moment(time, 'ddd MMM D HH:mm:ss ZZ YYYY');
  if (m.year() === moment().year()) {
    return m.format('MMM D');
  }
  return m.format('MMM D, YYYY');
}

function isoTime(time) {
  return moment(time, 'ddd MMM D HH:mm:ss ZZ YYYY').toDate().toISOString();
}

function autoParagraph(text) {
  return '<p>' + text.split(/\n\n+/).join('</p>\n<p>') + '</p>';
}

function linkedText(tweet) {
  let linkedText = twitterText.autoLink(tweet.full_text, {
    urlEntities: tweet.entities.urls,
    target: '_blank',
    invisibleTagAttrs: 'class="u-visually-hidden"',
    usernameIncludeSymbol: true
  });

  tweet.entities.urls.forEach(function (entity) {
    linkedText = linkedText.replace(entity.url, entity.expanded_url);
  });

  return linkedText;
}

module.exports = processTweet;
