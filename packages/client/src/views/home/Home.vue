<template>
  <div class="home">
    <helmet defaultTitle="Home" titleTemplate="Home | %s"> </helmet>
    <home-header></home-header>
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import HomeHeader from './HomeHeader';

export default Vue.extend({
  name: 'home',
  components: { HomeHeader },
  data: () => ({}),
  computed: mapState(['authUser']),
  validations: {},
  methods: {},
  async beforeMount() {},
});
</script>

<style scoped></style>
