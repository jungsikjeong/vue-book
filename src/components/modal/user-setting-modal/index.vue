<script setup lang="ts">
import { defineProps, ref } from 'vue';
import router from '@/router';

import ProfileEdit from '../../../components/my-page/ProfileEdit.vue';
import InfoModal from '../info-modal/index.vue';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '@/firebaseApp';

const auth = getAuth(app);
const props = defineProps({ onModalOpen: Function });
const profileViewState = ref(false);
const isUserInfoModal = ref(false);

const onProfileView = () => {
  profileViewState.value = !profileViewState.value;
};

const onLogout = async () => {
  await signOut(auth);
  localStorage.removeItem('user');
  isUserInfoModal.value = false;
  router.push('/');
};

const onOpenModal = () => {
  isUserInfoModal.value = true;
};

const onCloseModal = () => {
  isUserInfoModal.value = false;
};
</script>

<template>
  <div class="container">
    <ProfileEdit
      v-if="profileViewState"
      :profileViewState="profileViewState"
      :onProfileView="onProfileView"
    />

    <InfoModal
      :title="`로그아웃`"
      :content="`로그아웃 하시겠어요?`"
      :butName="`로그아웃`"
      :onClick="onLogout"
      :onCloseModal="onCloseModal"
      v-if="isUserInfoModal"
    />

    <div class="header" v-if="!profileViewState">
      <font-awesome-icon
        :icon="['fas', 'xmark']"
        class="pointer"
        style="font-size: 1.2rem"
        @click="props.onModalOpen"
      />
      설정
    </div>

    <ul class="list" v-if="!profileViewState">
      <li class="item">
        <div class="pointer" @click="onProfileView">프로필 수정</div>

        <div class="pointer" @click="onProfileView">
          <font-awesome-icon :icon="['fas', 'arrow-right']" />
        </div>
      </li>

      <li class="line"></li>

      <li class="item m-1">
        <span class="pointer" @click="onOpenModal">로그아웃</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: absolute !important;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 10;
  background-color: white;

  // 최소 너비 600px일 때
  @media (min-width: 600px) {
    padding: 1rem 0 !important;
  }
}

.header {
  display: flex;
  align-items: center;
  gap: 20px;
  font-weight: bold;
  border-bottom: 0;
}

.list {
  margin-top: 1rem;
  color: $black-color;
  font-weight: 600;
}

.item {
  display: flex;
  align-items: center;
  padding: 0.2rem 0;

  > div:last-child {
    margin-left: auto;
  }
}

.line {
  position: absolute;
  width: 100%;
  left: 0;
  border-bottom: 5px solid #eee;
  background-color: #eee;

  // 최소 너비 600px일 때
  @media (min-width: 600px) {
    width: 100%;
    border-bottom: 5px solid #eee;
  }
}
</style>
