import Vue from 'vue';
import router from './app.routes.js';
import Fragment from 'vue-fragment';
import Toasted from 'vue-toasted';
import VueForm from 'vue-form';

Vue.use(Fragment.Plugin);
Vue.use(VueForm);

Vue.use(Toasted, {
  position: 'bottom-center',
  keepOnHover: true,
  className: 'toast',
  theme: 'outline',
  duration: 5000
});

new Vue({
  router
}).$mount('#app');
