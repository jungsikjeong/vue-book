<script setup lang="ts">
import { defineProps, onMounted } from 'vue';
import router from '@/router';

import InfoModal from '../components/modal/info-modal/index.vue';
import FollowingPost from '../components/followingPost/index.vue';
// import SubTitle from '../components/sub-title/index.vue';

const props = defineProps(['user']);

const onLoginLinkClick = () => {
  router.push('/login');
};

const onCloseModal = () => {
  router.push('/');
};

onMounted(() => {});
</script>
<template>
  <InfoModal
    :title="`로그인이 필요해요.`"
    :content="`로그인 후 기능을 사용할 수 있어요`"
    :butName="`로그인`"
    :onClick="onLoginLinkClick"
    :onCloseModal="onCloseModal"
    v-if="!props?.user"
  ></InfoModal>

  <div class="following-container" v-if="props?.user">
    <FollowingPost />
  </div>
  <!-- <div v-if="props?.user" class="following-wrapper">
    <div class="not-following">
      <SubTitle :title="`구현 예정입니다.😅`"></SubTitle>
    </div>
  </div> -->
</template>

<style lang="scss" scoped>
.following-container {
  max-width: 40rem;
  margin: 0 auto;
}

.not-following {
  padding: 1rem;
}
</style>
