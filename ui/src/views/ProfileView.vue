<style scoped>
article footer {
  display: flex;
  justify-content: space-between;
}
article header {
  display: flex;
  justify-content: space-between;

  & h2 {
    margin-bottom: 0;
  }
}
</style>
<template>
  <article>
    <header>
      <h2>Profile</h2>
      <RouterLink to="/">Home</RouterLink>
    </header>
    <form @submit.prevent="updateProfile">
      <fieldset>
        <legend>Basic Info</legend>
        <label>
          Full name
          <input placeholder="Full name" v-model="userData.fullName" />
        </label>
        <label>
          Email
          <input type="email" placeholder="Email" autocomplete="email" v-model="userData.email" />
        </label>
        <label>
          Age
          <input type="number" placeholder="Age" v-model="userData.age" />
        </label>
      </fieldset>
      <fieldset>
        <legend>Security Info</legend>
        <label>
          * Current Password
          <input type="password" placeholder="Full name" v-model="auth.currentPassword" />
          <small>You must confirm your current password in order to update you profile data.</small>
        </label>
        <label>
          New Password
          <input type="password" placeholder="Full name" v-model="auth.password" />
        </label>
        <label>
          Confirm Password
          <input type="password" placeholder="Full name" v-model="auth.passwordConfirmation" />
        </label>
      </fieldset>
      <button type="submit">Save</button>
    </form>
    <footer>
      <button type="button" @click="logout" class="secondary">Logout</button>
      <button type="button" @click="deleteAcount" class="secondary outline">Delete Account</button>
    </footer>
  </article>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { networkSocialApi } from '@/api/networkSocialApi';
import type { User } from '@/interfaces/user-interface';
import { useUserStore } from '@/stores/user.store';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore()
const { user, access_token } = storeToRefs(userStore);

const userData = ref<User | any>(user.value ?? {
  fullName: '',
  age: 0,
  email: ''
});

const auth = ref({
  currentPassword: '',
  password: '',
  passwordConfirmation: ''
})

async function updateProfile() {
  let entries = Object.entries(auth.value).filter((entry) => entry[1].length);
  let _auth = Object.fromEntries(entries);
  networkSocialApi
    .put('http://localhost:3000/user', { ...userData.value, ..._auth }, {
      headers: {
        Authorization: `Bearer ${access_token.value}`
      }
    })
    .then(() => {
      userStore.getUserInfo()
      alert('Success:\nProfile updated.')
    })
    .catch(({ response: { data } }) => {
      alert('Error:\n' + data.message ?? data.error)
    })
}

async function logout() {
  userStore.logout();
  router.push('/login');
}

async function deleteAcount() {
  const confirmation = confirm('Really nigga?');
  if(!confirmation) return;
  await userStore.deleteAccount()
  router.push('/login');
}
</script>
