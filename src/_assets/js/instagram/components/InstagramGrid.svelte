<script>
  import InstagramImage from "./InstagramImage.svelte";
  import instagram from "../../../../_data/instagram.json";
</script>

<ul class="c-instagram-grid" id="instagram-grid">
  {#each instagram as image (image.id)}
    <li class="c-instagram-grid__item o-ratio o-ratio--1:1">
      <a class="c-instagram-grid__link o-ratio__content" target="_blank" href="{image.permalink}">
        <InstagramImage id={image.id} caption={image.caption} />
      </a>
    </li>
  {/each}
</ul>
