<script>
  import Tweet from "./Tweet.svelte";
  import Icons from "./Icons.svelte";
  import VirtualList from "./VirtualList.svelte";
  import tweets from "../../../../_data/twitter_timeline.json";
</script>

<Icons/>

<VirtualList items={tweets} let:item>
  <Tweet tweet={item}></Tweet>
</VirtualList>
