<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchDetailPost } from '../../api/post';

import Post from './Post.vue';
import Comment from './Comment.vue';
import Loading from '../Loading.vue';
import { fetchUserInfo } from '@/api/user';

const paramsId = useRoute().params.id;

const post = ref<string[]>([]);
const loading = ref(true);

const fetchData = async () => {
  const postData = await fetchDetailPost(paramsId as string);

  if (postData) {
    const postAuthor = await fetchUserInfo(postData[0]?.uid);

    const copyData = [
      {
        ...postData[0],
        user: {
          postAuthor: postAuthor[0].displayName,
          photoURL: postAuthor[0].photoURL,
        },
      },
    ];

    post.value = copyData;
  }
  loading.value = false;
};

const onLikeClick = () => {
  alert('구현준비중입니다..😅');
};

onMounted(fetchData);

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <Loading v-if="loading" />

  <div v-if="!loading">
    <Post v-for="postItem in post" :postItem="postItem" :key="postItem" />

    <Comment
      v-for="postItem in post"
      :postItem="postItem"
      :key="postItem"
      :onLikeClick="onLikeClick"
    />
  </div>
</template>

<style scoped lang="scss"></style>
