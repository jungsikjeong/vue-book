<script setup lang="ts">
import { inject, ref } from 'vue';
import router from '@/router';

import InfoModal from '../components/modal/info-modal/index.vue';
import { useStore } from 'vuex';

const store = useStore();
const user = ref(store.getters['userStore/getUser']);

interface FollowingProps {
  // eslint-disable-next-line no-unused-vars
  onTapChange: (name: string) => void;
}

const { onTapChange } = inject<FollowingProps>('currentTapName', {
  onTapChange: () => {},
});

const onLoginLinkClick = () => {
  router.push('/login');
};

const onCloseModal = () => {
  router.go(-1);
  onTapChange('');
};
</script>
<template>
  <InfoModal
    :title="`로그인이 필요해요.`"
    :content="`로그인 후 기능을 사용할 수 있어요`"
    :butName="`로그인`"
    :onClick="onLoginLinkClick"
    :onCloseModal="onCloseModal"
    v-if="!user"
  ></InfoModal>

  팔로잉
</template>

<style lang="scss" scoped></style>
