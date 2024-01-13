<script setup lang="ts">
import { defineProps } from 'vue';
import router from '@/router';

import InfoModal from '../components/modal/info-modal/index.vue';

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
    v-if="!props?.user"
  ></InfoModal>

  <div class="container" v-if="props?.user">
    <header class="header">알림</header>

    <div class="not-found">
      <img src="/image/no-alarm.PNG" alt="" />
      <strong>알림이 없습니다.</strong>

      <p>
        댓글,좋아요에 대한 새로운 알림이<br />
        이곳에 표시됩니다.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  padding: 1rem;
}
.header {
  font-weight: bold;
  border: none;
}

.not-found {
  margin: 0 auto;
  padding-top: 10rem;
  text-align: center;

  img {
    margin: 0 auto;
    padding-bottom: 1rem;
    width: 100px;
  }

  p {
    font-size: 0.765rem;
  }
}
</style>
