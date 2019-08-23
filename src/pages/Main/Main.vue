<script>
  import axios from 'axios';
  import { DateTime, Interval } from 'luxon';

  export default {
    name: 'Main',

    data() {
      return {
        firstName: '',
        firstLetter: '',
        secondName: '',
        secondLetter: '',
        date: 0,
        fromNow: '',
        interval: null
      };
    },

    created() {
      axios.get('/api/pair/1')
        .then((resp) => {
          const { data } = resp;

          this.performDataForPrint(data.data);

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
        const { firstName, secondName, date } = data;

        this.firstName = firstName;
        this.secondName = secondName;
        this.firstLetter = firstName[0].toUpperCase();
        this.secondLetter = secondName[0].toUpperCase();
        this.date = date;

        const luxonDate = DateTime.fromISO(date);
        const luxonInterval = Interval.fromDateTimes(luxonDate, DateTime.local());

        this.fromNow = luxonInterval.count('days');
      }
    }

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
