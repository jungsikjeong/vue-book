<script setup lang="ts">
import { onMounted, defineProps } from 'vue';

import HotTopicSwiper from '@/components/HotTopicSwiper.vue';
import PostList from '@/components/post-list/index.vue';
import router from '@/router';

const props = defineProps(['user']);

onMounted(() => {
  const isUser = localStorage.getItem('user') || props.user;
  const isCustomer = localStorage.getItem('customer');

  if (!isUser && !isCustomer) {
    router.push('/login');
  }
});
</script>

<template>
  <HotTopicSwiper />

  <PostList />
</template>

<style lang="scss" scoped></style>
