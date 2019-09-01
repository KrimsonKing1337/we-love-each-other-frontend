<script>
  export default {
    name: 'BgShadow'
  };
</script>

<template>
  <div class="shadow" />
</template>

<style scoped lang="scss">
  .shadow {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background: #000;
    opacity: 0.2;
  }
</style>
