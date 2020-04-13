const { getSrc } = require('./images');
const { DateTime } = require('luxon');
const slugify = require('@sindresorhus/slugify');

module.exports = {
  src: getSrc,

  date_to_format: function(date, format) {
    return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat(
      String(format)
    );
  },

  date_to_iso: function(date) {
    return DateTime.fromJSDate(date, { zone: 'utc' }).toISO({
      includeOffset: false,
      suppressMilliseconds: true
    });
  },

  slice: function(array, i = 0, j = array.length) {
    return array.slice(i, j);
  },

  slugify: function(input) {
    if (!input) return null;

    return slugify(input, {
      customReplacements: [
        ["'", ''],
        ['’', ''],
        ['‘', '']
      ]
    });
  },

  to_rgb: function(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    if (!result) return null;

    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);

    return `${r}, ${g}, ${b}`;
  },

  cssrev: function(asset) {
    if (process.env.ELEVENTY_ENV === 'production') {
      const manifest = require('../dist/css/css-manifest.json');
      return manifest[asset];
    }
    return asset;
  }

};
