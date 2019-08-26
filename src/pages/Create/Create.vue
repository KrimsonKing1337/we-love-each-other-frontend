<script>
  import {IMaskComponent} from 'vue-imask';
  import axios from 'axios';
  import { DateTime } from 'luxon';
  import FormFieldMessages from './components/FormFieldMessages';

  export default {
    component: 'Create',

    components: {
      FormFieldMessages,
      'imask-input': IMaskComponent
    },

    data() {
      return {
        newId: 0,
        newLink: '',
        formstate: {},
        model: {
          firstName: '',
          secondName: '',
          date: ''
        }
      }
    },

    methods: {
      handleSubmit() {
        if (this.formstate.$invalid) return;

        this.submitForm(this.model);
      },
      submitForm(data) {
        const {firstName, secondName, date} = data;
        const dateUTC = DateTime.fromFormat(date, 'dd.MM.yyyy').toISODate();

        const firstNameForSend = firstName.length > 255 ? this.cutTooLongString(firstName) : firstName;
        const secondNameForSend = secondName.length > 255 ? this.cutTooLongString(secondName) : secondName;

        axios.post('/api/pair', {
          firstName: firstNameForSend,
          secondName: secondNameForSend,
          date: dateUTC
        })
          .then((resp) => {
            const { data } = resp;

            this.newId = data.id;
            this.newLink = `${window.location.origin}/id${this.newId}`;

            console.log('data', data);
          })
          .catch((err) => {
            this.$toasted.show(err, {
              type: 'error'
            });

            console.error(err);
          });
      },
      cutTooLongString(str) {
        return str.split('').slice(0, 255).join('');
      }
    }
  };
</script>

<template>
  <div class="create">
    <div class="form">
      <vue-form :state="formstate" @submit.prevent="handleSubmit">
        <validate tag="label">
          <label for="firstName">
            First name
          </label>

          <input
            id="firstName"
            v-model="model.firstName"
            required
            name="firstName"
            maxlength="255"
          >

          <form-field-messages name="firstName" />
        </validate>

        <validate tag="label">
          <label for="secondName">
            Second name
          </label>

          <input
            id="secondName"
            v-model="model.secondName"
            name="secondName"
            required
            maxlength="255"
          >

          <form-field-messages name="secondName" />
        </validate>

        <validate tag="label">
          <label for="date">
            Relationship start date
          </label>

          <imask-input
            id="date"
            v-model="model.date"
            name="date"
            :mask="Date"
            :unmask="true"
            required
            maxlength="255"
          />

          <form-field-messages name="date" />
        </validate>

        <button type="submit">
          Submit
        </button>
      </vue-form>
    </div>

    <div v-if="newId" class="link">
      Your personal link is
      <router-link :to="`/id${newId}`">
        {{ newLink }}
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import "~common/styles/mixins";

  .create {
    @include bg;
  }

  .link {
    margin-top: 15px;
  }
</style>
