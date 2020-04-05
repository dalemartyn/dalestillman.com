<script>
  import Tweet from "./Tweet.svelte";
  import Icons from "./Icons.svelte";
  import tweets from "../../../../_data/tweets.json";
</script>

<Icons/>

{#each tweets as tweet}
  <Tweet {tweet}></Tweet>
{/each}
