<script setup lang="ts">
import { defineProps } from 'vue';
import UserList from './UserList.vue';
import PostList from './PostList.vue';

const props = defineProps({
  dummyUsers: Array,
  dummyPosts: Array,
  currentTapName: String,
});
</script>

<template>
  <UserList
    v-if="props.currentTapName === '유저들'"
    :dummyUsers="props.dummyUsers"
  />

  <PostList
    v-if="props.currentTapName === '기록들'"
    :dummyPosts="props.dummyPosts"
  />
</template>

<style lang="scss" scoped></style>
