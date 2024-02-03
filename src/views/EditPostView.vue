<script setup lang="ts">
import { defineProps } from 'vue';
import router from '@/router';

import InfoModal from '../components/modal/info-modal/index.vue';
import EditPost from '../components/edit-post/EditPost.vue';

const props = defineProps(['user']);

const onLoginLinkClick = () => {
  router.push('/login');
};

const onCloseModal = () => {
  router.go(-1);
};
</script>

<template>
  <InfoModal
    :title="`로그인이 필요해요.`"
    :content="`로그인 후 기능을 사용할 수 있어요`"
    :butName="`로그인`"
    :onClick="onLoginLinkClick"
    :onCloseModal="onCloseModal"
    v-if="!props.user"
  ></InfoModal>

  <div class="container" v-if="props.user">
    <EditPost />
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  overflow: hidden;
  padding: 1rem;
  max-width: 40rem;
  margin: 0 auto;
}
</style>
