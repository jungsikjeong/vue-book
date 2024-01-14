<script setup lang="ts">
import { ref, defineProps } from 'vue';

import router from '@/router';

import userSettingModal from '../components/modal/user-setting-modal/index.vue';
import PostList from '../components/my-page/post-list.vue';
import InfoModal from '../components/modal/info-modal/index.vue';

// TODO 유저의 기록,팔로워,팔로잉 숫자가 1이상이면 텍스트색상 굵게

const currentTapName = ref('');
const modalShow = ref(false);
const props = defineProps(['user']);

const onTapChange = (name: string) => {
  currentTapName.value = name;
};

const onModalOpen = () => {
  modalShow.value = !modalShow.value;
};

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
    <Transition name="slide-fade">
      <userSettingModal :onModalOpen="onModalOpen" v-if="modalShow" />
    </Transition>

    <div v-if="!modalShow">
      <div class="myPage-header">
        <font-awesome-icon :icon="['fas', 'gear']" @click="onModalOpen" />
      </div>

      <div class="section">
        <div class="user-info-wrap">
          <img class="user-image" :src="props.user?.photoURL" alt="" />
        </div>
        <div class="user-record-wrap">
          <div>
            <p>0</p>
            <p class="user-record-text">기록</p>
          </div>
          <span class="line"></span>
          <div>
            <p>0</p>
            <p class="user-record-text">팔로워</p>
          </div>
          <span class="line"></span>
          <div>
            <p>0</p>
            <p class="user-record-text">팔로잉</p>
          </div>
        </div>
      </div>

      <div
        class="user-name"
        :class="{ userStyle: props.user?.displayName?.length <= 3 }"
      >
        {{ props.user?.displayName }}
      </div>

      <header class="taps-wrap">
        <ul class="taps">
          <li
            :class="{ active: currentTapName === '' }"
            class="tap"
            @click="onTapChange && onTapChange('')"
          >
            보드
          </li>
          <li
            :class="{ active: currentTapName === '컬렉션' }"
            class="tap"
            @click="onTapChange && onTapChange('컬렉션')"
          >
            컬렉션
          </li>
        </ul>
      </header>

      <div class="section">
        <PostList />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;
  padding: 1rem;
}
.myPage-header {
  display: flex;
  justify-content: flex-end;
  color: gray;
  opacity: 0.7;
  margin-bottom: 1rem;
  cursor: pointer;

  :hover {
    color: $black-color;
    opacity: 1;
  }
}
.section {
  display: flex;
}

.user-info-wrap {
  width: 65px;
  margin-right: 1rem;

  .user-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
}
.user-record-wrap {
  width: calc(100% - 5.5rem);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 10px;
  color: $cloudy-gray;

  > div {
    padding: 0 5px;
    text-align: center;
  }

  > .line {
    margin-top: 10px;

    &::after {
      content: '';
      border-left: 1px solid $cloudy-gray;
      opacity: 0.2;
      height: 30px;
      display: inline-block;
      margin-left: 5px;
    }
  }
}
.user-record-text {
  color: $black-color;
  opacity: 0.8;
}

.user-name {
  margin: 1rem 0;
  font-weight: bold;
  width: 200px;
}
.userStyle {
  width: 65px;
  text-align: center;
}
.taps-wrap {
  border-bottom: 1px solid #eee;
}
.taps {
  position: relative;
  display: flex;
  padding: 0 1rem;
  width: 100%;
  font-size: 0.875rem;

  .tap {
    padding: 0 0.5rem;
    padding-bottom: 0.2rem;
    cursor: pointer;
  }

  .active {
    font-weight: 600;
    padding-bottom: 0.2rem;
    border-bottom: 2px solid black;
  }
}
</style>
