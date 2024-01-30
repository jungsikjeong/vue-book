<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { fetchFollowingPostList } from '../../api/following';
import { toggleLikePost } from '@/api/post';

import FollowingPost from './FollowingPost.vue';
import FollowingComment from './FollowingComment.vue';
import Loading from '../Loading.vue';

const store = useStore();

const user = ref(store.getters['userStore/getUser']);

const page = ref(1);
const postLimitCount = ref();
const lastPost = ref(false);
const scrollComponent = ref(null);

const postList = ref<any[]>([]);
const loading = ref(false);
const loadingMorePost = ref(false);

const fetchData = async (page: number, user: any) => {
  const newPosts = await fetchFollowingPostList(page, user);
  if (newPosts) {
    postList.value = [...postList.value, ...newPosts.dataArr];
    postLimitCount.value = newPosts?.limitCount;
  }
};

const loadFetchData = async (page: number, user: any) => {
  try {
    const newPosts = await fetchFollowingPostList(page, user);

    if (newPosts) {
      postList.value = [...postList.value, ...newPosts.dataArr];
    }
  } catch (error) {
    console.error(error);
  }
};

const onLikeClick = async (postId: string, user: any) => {
  const newData: any = await toggleLikePost(postId, user?.uid);

  const oldData = [...postList.value];

  if (newData) {
    const indexToUpdate = oldData.findIndex((post) => post.id === newData.id);

    if (indexToUpdate !== -1) {
      // oldData 배열에서 해당 포스트를 newData로 교체
      oldData[indexToUpdate] = newData;
      postList.value = oldData;
    }
    await store.dispatch('userStore/initAuth');
  }
};
const handleScroll = async () => {
  let element: any = scrollComponent.value;

  if (
    element &&
    element.getBoundingClientRect().bottom < window.innerHeight &&
    !loadingMorePost.value &&
    !lastPost.value
  ) {
    loadingMorePost.value = true;
    page.value++;
    await loadFetchData(page.value, user.value);

    loadingMorePost.value = false;
  } else if (postList.value.length === postLimitCount.value) {
    lastPost.value = true;
  }
};
onMounted(async () => {
  loading.value = true;
  await fetchData(page?.value, user?.value);
  loading.value = false;
});

onMounted(async () => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <Loading v-if="loading" />

  <div v-if="!loading" ref="scrollComponent">
    <div
      v-for="postItem in postList"
      :key="postItem.id"
      :data-key="postItem.id"
      class="wrapper"
    >
      <FollowingPost :postItem="postItem" />

      <FollowingComment :postItem="postItem" :onLikeClick="onLikeClick" />
    </div>

    <Loading v-if="loadingMorePost" />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  padding: 1rem;
}
</style>
