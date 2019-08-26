<script>
  export default {
    component: 'FormFieldMessages',

    props: {
      name: {
        type: String,
        required: true
      }
    }
  }
</script>

<template>
  <field-messages :name="name" show="$submitted">
    <div slot="required">
      {{ name }} is a required field
    </div>

    <div slot="maxlength">
      The string is too large
    </div>
  </field-messages>
</template>
