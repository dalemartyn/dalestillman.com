<script>
  import Tweet from "./Tweet.svelte";
  import Icons from "./Icons.svelte";
  import VirtualList from "./VirtualList.svelte";
  import tweets from "../../../../_data/twitter_timeline.json";
  import likes from "../../../../_data/twitter_likes.json";

  let view = "tweets";
  $: items = view === "tweets" ? tweets : likes;
</script>

<Icons/>

<ul class="c-tab-menu c-tab-menu--stretch">
  <li class="c-tab-menu__item" class:is-active="{view === 'tweets'}">
    <button
      on:click={() => view = "tweets"}
      class:active="{view === 'tweets'}"
      class="c-tab-menu__link">
      Tweets
    </button>
  </li>
  <li class="c-tab-menu__item" class:is-active="{view === 'likes'}">
    <button
      on:click={() => view = "likes"}
      class="c-tab-menu__link">
      Likes
    </button>
  </li>
</ul>
<VirtualList items={items} let:item>
  <Tweet tweet={item}></Tweet>
</VirtualList>
