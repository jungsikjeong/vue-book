<script setup lang="ts">
import HotTopicSwiper from '@/components/HotTopicSwiper.vue';
import PostList from '@/components/post-list/index.vue';
</script>

<template>
  <div class="container">
    <HotTopicSwiper />

    <PostList :title="`최신기록`" />
  </div>
</template>

<style lang="scss" scoped>
.container {
}

.section-title {
  font-weight: bold;
}
</style>
