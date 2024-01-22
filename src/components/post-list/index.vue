<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { fetchPostList } from '@/api/post';

import PostItem from './post-item/index.vue';
import Button from '../button/index.vue';
import SubTitle from '../sub-title/index.vue';
import Loading from '../Loading.vue';

const posts = ref();
const count = ref(1);
const isMoreButtonDisabled = ref(false);
const isLoading = ref(true);

const onPostMoreBtnClick = async () => {
  if (!isMoreButtonDisabled.value) {
    count.value += 1;
    const newPosts = await fetchPostList({ count: count.value });

    posts.value = [...posts.value, ...newPosts.dataArr];

    isMoreButtonDisabled.value = newPosts.postCount === posts.value.length;
  }
};

onMounted(async () => {
  const data = await fetchPostList();
  posts.value = data.dataArr;
  isLoading.value = false;
});
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
