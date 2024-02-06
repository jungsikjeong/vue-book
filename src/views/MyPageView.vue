<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue';
import router from '@/router';
import {
  decreasePostCount,
  deletePost,
  fetchMyPostLikeList,
  fetchMyPostList,
} from '@/api/post';
import { downUserPostCount } from '@/api/user';

import userSettingModal from '../components/modal/user-setting-modal/index.vue';
import PostItem from '../components/my-page/Post-item.vue';
import InfoModal from '../components/modal/info-modal/index.vue';
import Tab from '../components/tab/index.vue';
import Loading from '@/components/Loading.vue';
import SubTitle from '../components/sub-title/index.vue';

const postList = ref();
const currentTapName = ref('기록');
const modalShow = ref(false);
const isLoading = ref(false);

const props = defineProps(['user']);

const onTapChange = async (name: string) => {
  if (currentTapName.value === name) {
    return;
  }
  currentTapName.value = name;
  if (name === '컬렉션') {
    isLoading.value = true;

    postList.value = await fetchMyPostLikeList(props?.user?.likePost);
    isLoading.value = false;
  } else if (name === '기록') {
    if (props?.user) {
      isLoading.value = true;

      const postData = await fetchMyPostList(props?.user?.uid);
      postList.value = postData;

      isLoading.value = false;
    }
  }
};

const getPostList = async () => {
  if (props?.user) {
    const postData = await fetchMyPostList(props?.user?.uid);
    postList.value = postData;

    isLoading.value = false;
  }
};

const handlePostDelete = async (postId: string) => {
  if (postId) {
    const result = await deletePost(postId);
    if (result && result.status === 200) {
      await decreasePostCount();
      await downUserPostCount(props?.user?.uid);

      await getPostList();
    }
  }
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

const onClick = (clicked: string) => {
  if (clicked === '팔로워') {
    router.push(`/myPage/${props?.user.uid}/follower`);
  } else if (clicked === '팔로잉') {
    router.push(`/myPage/${props?.user.uid}/following`);
  }
};

onMounted(async () => {
  window.scroll(0, 0);

  isLoading.value = true;
  await getPostList();
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
          <div :class="{ isVisible: props?.user?.postCount !== 0 }">
            <p>{{ props?.user?.postCount }}</p>
            <p class="user-record-text">기록</p>
          </div>
          <span class="line"></span>
          <div
            :class="{ isVisible: props?.user?.followers?.length !== 0 }"
            class="pointer"
            @click="onClick('팔로워')"
          >
            <p>{{ props?.user?.followers?.length }}</p>
            <p class="user-record-text">팔로워</p>
          </div>
          <span class="line"></span>
          <div
            :class="{ isVisible: props?.user?.following?.length !== 0 }"
            class="pointer"
            @click="onClick('팔로잉')"
          >
            <p>{{ props?.user?.following.length }}</p>
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
        <router-link to="/writer" v-if="currentTapName !== '컬렉션'">
          <div class="box post-add-btn">
            <font-awesome-icon :icon="['fas', 'plus']" />
            <p>보드 추가</p>
          </div>
        </router-link>

        <div
          class="not-following"
          v-if="postList?.length === 0 || !postList || postList === undefined"
        >
          <SubTitle
            :title="
              currentTapName === '기록'
                ? `게시글이 없습니다..😅`
                : `컬렉션이 없습니다..😅`
            "
          ></SubTitle>
        </div>

        <PostItem
          v-for="postItem in postList"
          :key="postItem.id"
          :postItem="postItem"
          :handlePostDelete="handlePostDelete"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.isVisible {
  color: $black-color;
  font-weight: bold;
}

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
