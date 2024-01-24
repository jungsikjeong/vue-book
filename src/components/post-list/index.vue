<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchPostCount, fetchPostList } from '@/api/post';

import PostItem from './post-item/index.vue';
import Button from '../button/index.vue';
import SubTitle from '../sub-title/index.vue';
import Loading from '../Loading.vue';

const posts = ref();
const count = ref(6);
const postCount = ref();
const isMoreButtonDisabled = ref(false);
const isLoading = ref(false);

const onPostMoreBtnClick = async () => {
  if (!isMoreButtonDisabled.value) {
    count.value += 6;
    const newPosts = await fetchPostList({ count: count.value });

    posts.value = [...posts.value, ...newPosts];

    isMoreButtonDisabled.value = posts.value.length === postCount.value;
  }
};

const onPostList = async () => {
  if (!posts.value || posts.value === undefined) {
    isLoading.value = true;
    const data = await fetchPostList();
    posts.value = data;

    postCount.value = await fetchPostCount();
    isMoreButtonDisabled.value = posts.value?.length === postCount.value;
    isLoading.value = false;
  }
};

onMounted(onPostList);
</script>

<template>
  <div class="container">
    <SubTitle :title="`최신 기록`"></SubTitle>

    <Loading v-if="isLoading" />

    <ul class="post-list" v-if="!isLoading">
      <PostItem
        v-for="postItem in posts"
        :postItem="postItem"
        :key="postItem.id"
      />

      <Button
        :title="`더보기`"
        :icon="`▼`"
        :onBtnClick="onPostMoreBtnClick"
        :disabled="isMoreButtonDisabled"
      >
      </Button>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 1rem;
  max-width: 40rem;
  margin: 0 auto;
  margin-bottom: 3rem;
}

.post-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
