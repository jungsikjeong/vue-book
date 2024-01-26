<script setup lang="ts">
import { defineProps } from 'vue';
import UserList from './User-list.vue';
import PostList from './Post-list.vue';

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
