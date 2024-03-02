<style scoped>
nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}
</style>
<template>
  <Header />
  <RouterView />
</template>
<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import Header from './components/AppHeader.vue'
</script>


