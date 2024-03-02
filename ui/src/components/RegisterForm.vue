<template>
  <article>
    <h3>Register</h3>
    <form @submit.prevent="register">
      <fieldset>
        <label>
          Full name
          <input placeholder="Full name" v-model="user.fullName" />
        </label>
        <label>
          Email
          <input type="email" placeholder="Email" autocomplete="email" v-model="user.email" />
        </label>
        <label>
          Age
          <input type="number" placeholder="Age" v-model="user.age" />
        </label>
        <label>
          Password
          <input type="password" v-model="user.password" />
        </label>
        <label>
          Confirm Password
          <input type="password" v-model="user.passwordConfirmation" />
        </label>
      </fieldset>
      <button type="submit">Register</button>
      <RouterLink to="/login">Login</RouterLink>
    </form>
  </article>
</template>

<script setup lang="ts">
  import { networkSocialApi } from '@/api/networkSocialApi';
  import { ref } from 'vue'
  import { useRouter } from "vue-router";

  const router = useRouter()
  const user = ref({
    fullName: '',
    email: '',
    age: '',
    password: '',
    passwordConfirmation: ''
  })

  const register = async () => {
    networkSocialApi
      .post('http://localhost:3000/auth/register', user.value)
      .then(() => {
        router.push('/login')
      })
      .catch((error) => {
        console.log({error});
        alert(`Error:\n${error.response.data.message}`)
      })
  }
</script>