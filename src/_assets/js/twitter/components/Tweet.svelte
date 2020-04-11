<script>
  import Icon from "./Icon.svelte";

  export let tweet;
</script>

<div class="c-tweet">
  <div class="c-tweet__profile-image-container">
    <div class="c-tweet__profile-image">
      <Icon name={tweet.type}></Icon>
    </div>
  </div>
  <div class="c-tweet__main">
    <div class="c-tweet__user-meta">
      <a href="https://twitter.com/{tweet.user.screen_name}"
        class="c-tweet__user-profile-link" target="_blank">
        <div class="c-tweet__user-name">
          {tweet.user.name}
        </div>
        <div class="c-tweet__user-screen-name">
          @{tweet.user.screen_name}
        </div>
      </a>
      <span class="c-tweet__bullet-separator" aria-hidden="true">·</span>
      <a href="https://twitter.com/{tweet.user.screen_name}/status/{tweet.id_str}"
        class="c-tweet__permalink"
        target="_blank">
        <time datetime="{tweet.iso_time}"
          class="c-tweet__date">{tweet.human_time}</time>
      </a>
    </div>
    <div class="c-tweet__status">{@html tweet.text}</div>
  </div>
</div>
