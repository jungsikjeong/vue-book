<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';
import { useRoute } from 'vue-router';
import { fetchUserInfo } from '@/api/user';
import { fetchMyPostLikeList, fetchMyPostList } from '@/api/post';
import { addFollow, unFollow } from '@/api/follow';
import { useStore } from 'vuex';

import Button from '../components/button/index.vue';
import PostItem from '../components/my-page/Post-item.vue';
import Tab from '../components/tab/index.vue';
import Loading from '@/components/Loading.vue';
import SubTitle from '@/components/sub-title/index.vue';

const store = useStore();
const $route = useRoute();

// 현재 로그인한 유저
const props = defineProps(['user']);

const currentTapName = ref('기록');
const userInfo = ref();
const postList = ref([]);
const isFollow = ref(false);

const isLoading = ref(false);

const onFollow = async () => {
  if (props.user) {
    // 팔로우안한 상태라면,
    if (!isFollow.value) {
      // 팔로우
      await addFollow($route?.params?.id as string, props?.user);

      // 유저정보 최신화
      const data = await fetchUserInfo($route?.params?.id as string);
      userInfo.value = data[0];

      isFollow.value = true;

      // 팔로우 한 상태라면
    } else if (isFollow.value) {
      // 팔로우
      await unFollow($route?.params?.id as string, props?.user);

      // 유저정보 최신화
      const data = await fetchUserInfo($route?.params?.id as string);
      userInfo.value = data[0];

      isFollow.value = false;
    }

    // 유저정보 최신화
    await store.dispatch('userStore/initAuth');
  } else {
    alert('로그인이 필요한 서비스입니다.');
  }
};

const onTapChange = async (name: string) => {
  if (currentTapName.value === name) {
    return;
  }

  currentTapName.value = name;

  if (name === '컬렉션') {
    console.log('userInfo?.value?.uid:', userInfo?.value?.uid);
    isLoading.value = true;
    postList.value = await fetchMyPostLikeList(userInfo?.value?.uid);
    isLoading.value = false;
  } else {
    if (props?.user) {
      isLoading.value = true;

      const postData = await fetchMyPostList(userInfo?.value?.uid);
      postList.value = postData;

      isLoading.value = false;
    }
  }
};

const onUserInfoGet = async () => {
  isLoading.value = true;
  const data = await fetchUserInfo($route?.params?.id as string);
  userInfo.value = data[0];
  console.log(userInfo.value);

  postList.value = await fetchMyPostList($route?.params?.id as string);
  if (props?.user) {
    isFollow.value = props?.user?.following.includes(userInfo?.value?.uid);
  }
  isLoading.value = false;
};

onMounted(onUserInfoGet);
</script>

<template>
  <Loading v-if="isLoading" />
  <div class="container" v-if="!isLoading">
    <div>
      <div class="section">
        <div class="user-info-wrap">
          <img class="user-image" :src="userInfo?.photoURL" alt="" />
        </div>

        <div class="user-record-wrap">
          <div>
            <p :class="{ isVisible: userInfo?.postCount !== 0 }">
              {{ userInfo?.postCount }}
            </p>
            <p class="user-record-text">기록</p>
          </div>
          <span class="line"></span>
          <div>
            <p :class="{ isVisible: userInfo?.followers.length !== 0 }">
              {{ userInfo?.followers?.length }}
            </p>
            <p class="user-record-text">팔로워</p>
          </div>
          <span class="line"></span>
          <div>
            <p :class="{ isVisible: userInfo?.following.length !== 0 }">
              {{ userInfo?.following?.length }}
            </p>
            <p class="user-record-text">팔로잉</p>
          </div>
        </div>
      </div>

      <div
        class="user-name"
        :class="{ userStyle: userInfo?.displayName?.length <= 3 }"
      >
        {{ userInfo?.displayName }}
      </div>

      <!-- 팔로우 버튼 -->
      <div v-if="props?.user?.uid !== $route?.params?.id">
        <Button
          :title="`팔로우`"
          :onBtnClick="onFollow"
          style="background-color: black; color: white; margin-bottom: 1rem"
          v-if="!isFollow"
        ></Button>

        <Button
          :title="`팔로잉중`"
          :onBtnClick="onFollow"
          style="background-color: #ffba1d; color: white; margin-bottom: 1rem"
          v-if="isFollow"
        ></Button>
      </div>

      <Tab
        :currentTapName="currentTapName"
        :onTapChange="onTapChange"
        :names="['기록', '컬렉션']"
      />

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

      <div class="grid">
        <PostItem
          v-for="postItem in postList"
          :key="postItem"
          :postItem="postItem"
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

.user-info-wrap {
  width: 65px;
  height: 65px;
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
