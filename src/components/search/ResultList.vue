<script setup lang="ts">
import { defineProps } from 'vue';

import Loading from '../Loading.vue';
import UserList from './UserList.vue';
import PostList from './PostList.vue';

const props = defineProps({
  searchUserList: Array,
  searchPostList: Array,
  currentTapName: String,
  isLoading: Boolean,
});
</script>

<template>
  <Loading v-if="isLoading" />

  <UserList
    v-if="props.currentTapName === '유저들' && !isLoading"
    :searchUserList="props.searchUserList"
  />

  <PostList
    v-if="props.currentTapName === '기록들' && !isLoading"
    :searchPostList="props.searchPostList"
  />
</template>

<style lang="scss" scoped></style>
