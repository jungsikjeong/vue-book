<script setup lang="ts">
import { onMounted } from 'vue';

import PostDetail from '../components/postDetail/index.vue';

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
    <PostDetail />
  </div>
</template>

<style scoped lang="scss">
.post-detail-container {
  position: relative;
  max-width: 40rem;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 2.5rem;
}

.post-detail-header {
  position: fixed;
  top: 10px;
  z-index: 20;
}
</style>
