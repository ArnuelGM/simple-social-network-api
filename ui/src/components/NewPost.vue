<style scope>
dialog {
  display: block;

  & article {
    margin: 0;
    max-width: 100%;
  }
}
</style>
<template>
  <div v-if="user">
    <input @focus="openModal" type="text" placeholder="¿What are you thinking about?" />
  </div>
  <dialog :open="isOpen" v-if="user">
    <article>
      <header>
        <h4>Create new post</h4>
      </header>
      <form>
        <fieldset>
          <label>
            Title
            <input type="text" name="title" placeholder="Post title" v-model="postForm.title" />
          </label>
          <label>
            Content
            <textarea name="content" placeholder="Post Content" v-model="postForm.content"></textarea>
          </label>
        </fieldset>
      </form>
      <footer>
        <button @click="closeModal" className="secondary">Cancel</button>
        <button @click="createPost">Create</button>
      </footer>
    </article>
  </dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useModal } from '../composable/useModal'
import { networkSocialApi } from '@/api/networkSocialApi';
import { usePostsStore } from '@/stores/posts.store';
import { useUserStore } from '@/stores/user.store';
import { storeToRefs } from 'pinia';

const { getPosts } = usePostsStore()
const userStore = useUserStore();
const { access_token, user } = storeToRefs(userStore);
const { closeModal, isOpen, openModal } = useModal()

const postForm = ref({
  title: '',
  content: ''
});

async function createPost() {
  networkSocialApi
    .post('http://localhost:3000/post', postForm.value, {
      headers: {
        'Authorization': `Bearer ${access_token.value}`,
      }
    })
    .then(() => {
      getPosts()
    })
    .catch((error) => {
      alert(`Error:\n${error.response.data.message}`)
    })
    .finally(() => {
      postForm.value = {
        title: '',
        content: ''
      };
      closeModal()
    })
}

</script>
