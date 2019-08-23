<script>
  export default {
    name: 'Main',
  };
</script>

<template>
  <div class="main">
    <div class="wrapper">
      <div class="left-side">
        <div class="empty" />

        <div class="title">
          we love each other
        </div>

        <div class="border" />

        <div class="empty" />

        <div class="second-name">
          Н
        </div>
      </div>

      <div class="separator" />

      <div class="right-side">
        <div class="first-name">
          О
        </div>

        <div class="empty" />

        <div class="border" />

        <div class="counter">
          200 days
        </div>

        <div class="empty" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import "~common/styles/mixins";

  .main {
    background: rgba(0, 0, 0, 1) url("/img/bg.jpg");
    background-size: cover;
    box-shadow: inset 0 0 0 15px #252525;
    @include wrapper;
  }

  .wrapper {
    display: grid;
    grid-template-columns: calc(50% - 0.75rem - 1px) 1px calc(50% - 0.75rem - 1px);
    grid-template-rows: 100%;
    grid-column-gap: 0.75rem;
    align-items: center;
    width: 960px;
    height: 400px;
    flex-shrink: 0;
  }

  .left-side {
    display: grid;
    grid-template-rows: 10rem 3rem auto 3rem 10rem;
  }

  .right-side {
    display: grid;
    grid-template-rows: 10rem 3rem auto 3rem 10rem;
  }

  .separator {
    height: 90%;
    width: 1px;
    background: #252525;
    // margin: 0 0.75rem;
  }

  .title,
  .counter {
    font-size: 3rem;
    width: 100%;
  }

  .second-name,
  .first-name {
    font-family: ProximaNova-Bold, Arial, Helvetica, sans-serif;
    font-size: 10rem;
    width: 100%;
  }

  .first-name {
    text-align: right;
  }

  .title {
    text-align: center;
  }

  .counter {
    margin-top: -1px;
    text-align: center;
  }

  .border {
    background: #252525;
    width: 100%;
    height: 1px;
    margin: 0.625rem 0;
  }
</style>
