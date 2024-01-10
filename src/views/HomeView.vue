<script setup lang="ts">
import { onMounted } from 'vue';

import HotTopicSwiper from '@/components/HotTopicSwiper.vue';
import PostList from '@/components/post-list/index.vue';
import router from '@/router';

onMounted(() => {
  const isLocalUser = localStorage.getItem('user');
  if (!isLocalUser) {
    router.push('/login');
  }
});
</script>

<template>
  <HotTopicSwiper />

  <PostList />
</template>

<style lang="scss" scoped></style>
