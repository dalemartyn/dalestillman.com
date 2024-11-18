import { getSrc } from './images.js';
import { DateTime } from 'luxon';
import slugify from '@sindresorhus/slugify';
import fs from 'fs';
import path from 'path';

const env = process.env.ELEVENTY_ENV;

function load_manifest() {
  if (env !== 'production') {
    return {};
  }

  const manifestPath = path.resolve('dist/css/css-manifest.json');

  if (fs.existsSync(manifestPath)) {
    const data = fs.readFileSync(manifestPath, 'utf8');

    return JSON.parse(data);
  }

  return {};
}

const manifest = load_manifest();

export const src = getSrc;

export function date_to_format(date, format) {
  return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat(String(format));
}

export function date_to_iso(date) {
  return DateTime.fromJSDate(date, { zone: 'utc' }).toISO({
    includeOffset: false,
    suppressMilliseconds: true,
  });
}

export function slice(array, i = 0, j = array.length) {
  return array.slice(i, j);
}

export function slugifyFunction(input) {
  if (!input) return null;

  return slugify(input, {
    customReplacements: [
      ["'", ''],
      ['’', ''],
      ['‘', ''],
    ],
  });
}

export function to_rgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (!result) return null;

  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  return `${r}, ${g}, ${b}`;
}

export function cssrev(asset) {
  if (env === 'production') {
    return manifest[asset] || asset; // Return the asset from the manifest or fallback to the original asset
  }
  return asset; // In non-production, return the asset directly
}

export function bySlug(posts, slug) {
  return posts.find((post) => post.fileSlug === slug);
}
