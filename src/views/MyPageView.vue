<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue';
import router from '@/router';
import { fetchMyPostLikeList, fetchMyPostList } from '@/api/post';

import userSettingModal from '../components/modal/user-setting-modal/index.vue';
import PostItem from '../components/my-page/Post-item.vue';
import InfoModal from '../components/modal/info-modal/index.vue';
import Tab from '../components/tab/index.vue';
import Loading from '@/components/Loading.vue';

// TODO 유저의 기록,팔로워,팔로잉 숫자가 1이상이면 텍스트색상 굵게

const postList = ref();
const currentTapName = ref('기록');
const modalShow = ref(false);
const isLoading = ref(true);

const props = defineProps(['user']);

const onTapChange = async (name: string) => {
  currentTapName.value = name;
  await fetchMyPostLikeList(props?.user?.uid);
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

onMounted(async () => {
  window.scroll(0, 0);
  if (props?.user) {
    const postData = await fetchMyPostList(props?.user?.uid);
    postList.value = postData;

    isLoading.value = false;
  }
});
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

      <Tab
        :currentTapName="currentTapName"
        :onTapChange="onTapChange"
        :names="['기록', '컬렉션']"
      />

      <Loading v-if="isLoading" />

      <div class="grid" v-if="!isLoading">
        <div class="box post-add-btn">
          <font-awesome-icon :icon="['fas', 'plus']" />
          <p>보드 추가</p>
        </div>

        <PostItem
          v-for="postItem in postList"
          :key="postItem.id"
          :postItem="postItem"
        />
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

.grid {
  margin-top: 1rem;
  margin-bottom: 3.5rem;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: min-content;
  gap: 0.5rem;
}

.box {
  @media screen and (min-width: 480px) {
    width: 100%;
    height: 450px;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  color: $cloudy-gray;
  width: 100%;
  height: 240px;

  p {
    font-size: 0.7rem;
  }
}

.post-add-btn {
  @media screen and (min-width: 480px) {
    height: 450px;
  }

  border: 1px dashed #eee;
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
</style>
