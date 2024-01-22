<script setup lang="ts">
import { onMounted } from 'vue';

import Post from '../components/postDetail/Post.vue';
import Comment from '../components/postDetail/Comment.vue';

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <div class="post-detail-container">
    <header class="post-detail-header">
      <button class="back-btn" @click="$router.go(-1)">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
      </button>
    </header>

    <Post />

    <Comment />
  </div>
</template>

<style scoped lang="scss">
.post-detail-header {
  position: fixed;
  top: 10px;
  z-index: 20;
}

.post-detail-container {
  max-width: 40rem;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 2.5rem;
}
</style>
