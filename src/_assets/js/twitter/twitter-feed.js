import { mount } from 'svelte';

import TwitterFeed from './components/TwitterFeed.svelte';

mount(TwitterFeed, { target: document.getElementById('twitter-feed') });
