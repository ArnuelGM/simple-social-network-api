<template>
  <article>
    <h3>Login</h3>
    <form @submit.prevent="login">
      <fieldset>
        <label>
          Email address
          <input type="email" name="email" placeholder="Email address" v-model="auth.email" />
        </label>
        <label>
          Password
          <input type="password" name="password" placeholder="Password" v-model="auth.password" />
        </label>
      </fieldset>
      <input type="button" value="Log in" @click="login" />
      <RouterLink to="/register">Register</RouterLink>
    </form>
  </article>
</template>

<script setup lang="ts">
  import { networkSocialApi } from '@/api/networkSocialApi';
  import { useUserStore } from '@/stores/user.store';
  import { storeToRefs } from 'pinia';
  import { ref } from 'vue'
  import { useRouter } from "vue-router";

  const router = useRouter()
  const userStore = useUserStore();
  const { access_token, refresh_token } = storeToRefs(userStore);
  const { configUserInfo } = userStore;
  const auth = ref({ email: '', password: '' })

  const login = async () => {
    networkSocialApi
      .post('http://localhost:3000/auth/login', auth.value)
      .then(({data}) => {
        access_token.value = data.access_token
        refresh_token.value = data.refresh_token
        configUserInfo(access_token.value, refresh_token.value)
        router.push('/')
      })
      .catch((error) => {
        console.log({error});
        alert(`Error:\n${error.response.data.message}`)
      })
  }
</script>