<style scoped>
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

article {
  & header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & h6 {
      margin-bottom: 0;
    }
  }
  & footer {
    display: flex;
    justify-content: flex-end;
  }
}
p.no-content {
  text-align: center;
  margin-block: 1rem;
}
</style>
<template>
  <section>
    <div class="loading" v-if="isLoading">
      <span aria-busy="true">Please wait…</span>
    </div>
    <article v-for="post in posts" :key="post.id">
      <header>
        <h6>{{ post?.user?.fullName || 'Anonymous' }}</h6>
        <time>{{ new Date(post?.createdAt).toLocaleString() }}</time>
      </header>
      <div>
        <h3>{{ post.title }}</h3>
        <p>
          {{ post.content }}
        </p>
      </div>
      <footer v-if="user?.id === post.user?.id">
        <button class="secondary outline" @click="deletePost(post.id)">Delete</button>
      </footer>
    </article>
    <p v-if="!posts.length" class="no-content">Create you first post.</p>
  </section>
</template>
<script setup lang="ts">
  import { usePostsStore } from '@/stores/posts.store';
  import { useUserStore } from '@/stores/user.store';
  import { storeToRefs } from 'pinia';

  const postsStore = usePostsStore()
  const { getPosts, deletePost } = postsStore;
  const userStore = useUserStore();
  const { user } = storeToRefs(userStore);
  const { posts, isLoading } = storeToRefs(postsStore)

  getPosts();
</script>

