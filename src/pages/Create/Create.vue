<script>
  import {IMaskComponent} from 'vue-imask';
  import axios from 'axios';
  import { DateTime } from 'luxon';
  import FormFieldMessages from './components/FormFieldMessages';
  import {HalfCircleSpinner} from 'epic-spinners';

  export default {
    component: 'Create',

    components: {
      FormFieldMessages,
      'imask-input': IMaskComponent,
      HalfCircleSpinner
    },

    data() {
      return {
        newId: 0,
        newLink: '',
        linkIsReady: false,
        formstate: {},
        model: {
          firstName: '',
          secondName: '',
          date: ''
        },
        file: [],
        loading: false,
        loaderTimer: null
      }
    },

    methods: {
      /**
       *
       * @param loadingStatus {Boolean}
       */
      showLoadingIfRequestTooLong(loadingStatus) {
        if (this.loaderTimer || (loadingStatus === false && this.loaderTimer)) {
          clearTimeout(this.loaderTimer);
        }

        if (loadingStatus === false) {
          this.loading = false;
        }

        this.loaderTimer = setTimeout(() => {
          if (loadingStatus === false) return;

          this.loading = true;
        }, 1500);
      },
      submitForm(data, file) {
        const {firstName, secondName, date} = data;
        const dateUTC = DateTime.fromFormat(date, 'dd.MM.yyyy').toISODate();

        const firstNameForSend = firstName.length > 255 ? this.cutTooLongString(firstName) : firstName;
        const secondNameForSend = secondName.length > 255 ? this.cutTooLongString(secondName) : secondName;

        this.showLoadingIfRequestTooLong(true);

        axios.post('/api/pair', {
          firstName: firstNameForSend,
          secondName: secondNameForSend,
          date: dateUTC
        })
          .then((resp) => {
            const { data } = resp;

            this.newId = data.id;
            this.newLink = `${window.location.origin}/id${this.newId}`;

            return data.id;
          })
          .then((id) => {
            return this.submitFile(id);
          })
          .then((resp) => {
            const { data } = resp;

            console.log('submit file data', data);

            this.linkIsReady = true;
          })
          .catch((err) => {
            this.$toasted.show(err, {
              type: 'error'
            });

            console.error(err);
          })
          .finally(() => {
            this.showLoadingIfRequestTooLong(false);
          });
      },
      cutTooLongString(str) {
        return str.split('').slice(0, 255).join('');
      },
      submitFile(id) {
        const formData = new FormData();

        formData.append('file', this.file);

        return axios.put(`/api/pair/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      },

      handleSubmit() {
        if (this.formstate.$invalid) return;

        this.submitForm(this.model, this.file);
      },
      handleFileChange(e) {
        this.file = e.target.files[0];
      },
      handleCreateAnotherOneButtonClick() {
        window.location.reload();
      }
    }
  };
</script>

<template>
  <div class="create">
    <div class="wrapper">
      <vue-form
        v-if="!linkIsReady"
        :state="formstate"
        class="form"
        @submit.prevent="handleSubmit"
      >
        <validate class="line">
          <label for="firstName">
            First name
          </label>

          <input
            id="firstName"
            v-model="model.firstName"
            class="input"
            required
            name="firstName"
            maxlength="255"
            autocomplete="off"
          >

          <form-field-messages name="firstName" />
        </validate>

        <validate class="line">
          <label for="secondName">
            Second name
          </label>

          <input
            id="secondName"
            v-model="model.secondName"
            class="input"
            name="secondName"
            required
            maxlength="255"
            autocomplete="off"
          >

          <form-field-messages name="secondName" />
        </validate>

        <validate class="line">
          <label for="date">
            Relationship start date
          </label>

          <imask-input
            id="date"
            v-model="model.date"
            class="input"
            name="date"
            :mask="Date"
            :unmask="true"
            required
            maxlength="255"
            autocomplete="off"
          />

          <form-field-messages name="date" />
        </validate>

        <div class="line">
          <input
            type="file"
            accept="image/*"
            name="img"
            autocomplete="off"
            @change="handleFileChange"
          >
        </div>

        <button type="submit" class="button">
          <span v-if="!loading">
            Submit
          </span>

          <half-circle-spinner
            v-else
            :animation-duration="1000"
            :size="21"
            :color="'#252525'"
          />
        </button>
      </vue-form>

      <div v-if="linkIsReady" class="link-is-ready">
        <div class="link">
          Your personal link is
          <router-link :to="`/id${newId}`">
            {{ newLink }}
          </router-link>
        </div>

        <button type="button" class="button" @click="handleCreateAnotherOneButtonClick">
          Create another one
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import "~common/styles/mixins";

  .create {
    @include bg;
    background-image: url("/img/bg.jpg");
  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 960px;
    height: 400px;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    max-width: 330px;
    width: 100%;
  }

  .link {
    margin-top: 15px;
  }

  .input {
    outline: none;
    border: 0;
    border-radius: 4px;
    padding: 7px;
  }

  .line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 9px;

    &:nth-child(1) {
      margin-top: 0;
    }

    > div {
      display: none;
    }
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
    border: 0;
    padding: 11px;
    border-radius: 7px;
    font-size: 1rem;
    @include hover-default;
  }

  .link-is-ready {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
