import { ref, type Ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { networkSocialApi } from '@/api/networkSocialApi';
import type { Post } from '@/interfaces/post-list.response';
import { useUserStore } from './user.store';

export const usePostsStore = defineStore('counter', () => {
  
  const userStore = useUserStore();
  const { access_token } = storeToRefs(userStore);
  const posts: Ref<Post[]> = ref([]);
  const isLoading = ref(false);

  function getPosts() {
    networkSocialApi.get<Post[]>('/post', {
      headers: {
        'Authorization': `Bearer ${access_token.value}`,
      }
    }).then(({data}) => {
      posts.value = data
    })
    .catch((error) => {
      posts.value = [];
      alert(`Error:\n${error.response.data.message}`);
    })
    .finally(() => {
      isLoading.value = false;
    })
  }

  function deletePost(id: string) {
    networkSocialApi.delete<Post[]>(`/post/${id}`, {
      headers: {
        'Authorization': `Bearer ${access_token.value}`,
      }
    }).then(() => {
      getPosts();
    })
    .catch((error) => {
      alert(`Error:\n${error.response.data.message}`);
    })
    .finally(() => {
      isLoading.value = false;
    })
  }

  return { posts, isLoading, getPosts, deletePost }
})
