<template>
  <helmet-provider>
    <div class="app">
      <helmet defaultTitle="Integration continue" titleTemplate="Integration continue | %s">
        <html :lang="this.$i18n.locale"></html>
      </helmet>
      <router-view></router-view>
    </div>
  </helmet-provider>
</template>

<script lang="ts">
import Vue from 'vue';
import { HelmetProvider } from '@jnields/vue-helmet';

export default Vue.extend({
  name: 'app',
  components: {
    'helmet-provider': HelmetProvider,
  },
});
</script>

<style lang="scss"></style>
