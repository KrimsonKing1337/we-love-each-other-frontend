<script>
  import axios from 'axios';
  import { DateTime, Interval } from 'luxon';
  import BgShadow from 'components/BgShadow';

  export default {
    name: 'Main',
    components: { BgShadow },
    data() {
      return {
        firstName: '',
        firstLetter: '',
        secondName: '',
        secondLetter: '',
        date: 0,
        fromNow: '',
        interval: null,
        bg: '/img/bg.jpg'
      };
    },

    created() {
      const id = this.$route.params.id;

      axios.get(`/api/pair/${id}`)
        .then((resp) => {
          const { data } = resp;

          this.performDataForPrint(data.data);
          this.setBg(data.data);

          console.log('data', data);
        })
        .catch((err) => {
          this.$toasted.show(err, {
            type: 'error'
          });

          console.error(err);
        });
    },

    mounted() {
      this.interval = setInterval(() => {
        const luxonDate = DateTime.fromISO(this.date);
        const luxonInterval = Interval.fromDateTimes(luxonDate, DateTime.local());

        this.fromNow = luxonInterval.count('days');
      }, 1000);
    },

    methods: {
      performDataForPrint(data) {
        const { first_name: firstName, second_name: secondName, date } = data;

        this.firstName = firstName;
        this.secondName = secondName;
        this.firstLetter = firstName[0].toUpperCase();
        this.secondLetter = secondName[0].toUpperCase();
        this.date = date;

        const luxonDate = DateTime.fromISO(date);
        const luxonInterval = Interval.fromDateTimes(luxonDate, DateTime.local());

        this.fromNow = luxonInterval.count('days');
      },
      setBg(data) {
        const { img_src: imgSrc } = data;

        if (!imgSrc) return;

        this.bg = imgSrc;
      }
    }

  };
</script>

<template>
  <div class="main" :style="{'background-image': `url(${bg})`}">
    <BgShadow />

    <div class="wrapper">
      <div class="left-side">
        <div class="empty" />

        <div class="title">
          we love each other
        </div>

        <div class="border" />

        <div class="empty" />

        <div class="second-name">
          {{ secondLetter }}
        </div>
      </div>

      <div class="separator" />

      <div class="right-side">
        <div class="first-name">
          {{ firstLetter }}
        </div>

        <div class="empty" />

        <div class="border" />

        <div class="counter">
          {{ fromNow }} days
        </div>

        <div class="empty" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import "~common/styles/mixins";

  .main {
    @include bg;
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
