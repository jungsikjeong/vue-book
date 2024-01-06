<script setup lang="ts">
import HotTopicSwiper from '@/components/HotTopicSwiper.vue';
import PostList from '@/components/post-list/index.vue';
</script>

<template>
  <div class="container">
    <HotTopicSwiper />

    <PostList />
  </div>
</template>

<style lang="scss" scoped>
.section-title {
  font-weight: bold;
}
</style>
