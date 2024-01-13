<script setup lang="ts">
import { defineProps } from 'vue';
import router from '@/router';

import InfoModal from '../components/modal/info-modal/index.vue';

const props = defineProps(['user']);

const onLoginLinkClick = () => {
  router.push('/login');
};

const onCloseModal = () => {
  router.push('/');
};
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

  <div v-if="props?.user" class="following-wrapper">팔로잉</div>
</template>

<style lang="scss" scoped>
.following-wrapper {
  width: 40rem;
  margin: 0 auto;
}
</style>
