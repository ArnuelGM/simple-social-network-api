import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/interfaces/user-interface'
import { networkSocialApi } from '@/api/networkSocialApi'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const user: Ref<User | null> = ref(null)
  const access_token = ref('');
  const refresh_token = ref('');
  const router = useRouter()

  function configUserInfo(token: string, refresh: string) {
    localStorage.setItem('access_token', token)
    localStorage.setItem('refresh_token', refresh)
    access_token.value = token
    refresh_token.value = refresh
    getUserInfo()
  }

  function loadFromStorage() {
    const token = localStorage.getItem('access_token') ?? '';
    const refresh = localStorage.getItem('refresh_token') ?? '';
    if( !token || !refresh ) {
      router.push('/login')
      return;
    }
    configUserInfo(token, refresh);
  }

  function getUserInfo() {
    networkSocialApi
      .get<User>('http://localhost:3000/user', {
        headers: {
          Authorization: `Bearer ${access_token.value}`
        }
      })
      .then(({ data }) => {
        user.value = data
      })
      .catch((error) => {
        alert('Error:\n' + error.response.data.message ?? error.response.data.error)
      })
  }

  async function deleteAccount() {
    await networkSocialApi
      .delete<User>('http://localhost:3000/user', {
        headers: {
          Authorization: `Bearer ${access_token.value}`
        }
      })
      .then(({ data }) => {
        user.value = data
      })
      .catch((error) => {
        alert('Error:\n' + error.response.data.message ?? error.response.data.error)
      })
      .finally(() => logout())
    return;
  }

  function logout() {
    access_token.value = '';
    refresh_token.value = '';
    localStorage.setItem('access_token', '');
    localStorage.setItem('refresh_token', '');
    user.value = null;
  }

  return {
    user,
    access_token,
    refresh_token,
    getUserInfo,
    configUserInfo,
    loadFromStorage,
    logout,
    deleteAccount
  }
})
