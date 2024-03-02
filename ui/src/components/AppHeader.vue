<style scoped>
header {
  padding: 1rem 0;
  position: sticky;
  top: 0;
  backdrop-filter: blur(15px);
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: .5rem;
}

h1 {
  margin-bottom: 0;
}

.router-link-exact-active:hover {
  background-color: transparent;
}

.btnClose {
  background-color: #ee402e;
  border: none;
}
</style>

<template>
  <header class="header">
    <nav>
      <h1>
        <RouterLink to="/">SocialNet</RouterLink>
      </h1>

      <div v-if="user">
        <RouterLink to="/profile" role="button">
          Profile
        </RouterLink>
      </div>
    </nav>
    <NewPost />
  </header>
</template>
<script setup lang="ts">
  import NewPost from './NewPost.vue';
  import { useUserStore } from '@/stores/user.store';
  import { storeToRefs } from 'pinia';

  const userStore = useUserStore();
  const { user } = storeToRefs(userStore);
</script>
