<script>
  export let name;
  export let size = 54;
</script>

<svg class="icon" width={size} height={size}>
  <use xlink:href="#{name}" />
</svg>
