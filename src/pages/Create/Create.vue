<script>
  import {IMaskComponent} from 'vue-imask';
  import axios from 'axios';
  import { DateTime } from 'luxon';

  export default {
    component: 'Create',

    components: {
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

        axios.post('/api/pair', {
          firstName,
          secondName,
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
          >

          <field-messages name="firstName" show="$submitted">
            <div slot="required">
              First name is a required field
            </div>
          </field-messages>
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
          >

          <field-messages name="secondName" show="$submitted">
            <div slot="required">
              Second name is a required field
            </div>
          </field-messages>
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
          />

          <field-messages name="date" show="$submitted">
            <div slot="required">
              Relationship start date is a required field
            </div>
          </field-messages>
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
