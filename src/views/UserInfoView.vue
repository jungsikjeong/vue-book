<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';
import { useRoute } from 'vue-router';
import { fetchUserInfo } from '@/api/user';
import { fetchMyPostList } from '@/api/post';
import { addFollow } from '@/api/follow';

import Button from '../components/button/index.vue';
import PostItem from '../components/my-page/Post-item.vue';
import Tab from '../components/tab/index.vue';
import Loading from '@/components/Loading.vue';

const $route = useRoute();

// 현재 로그인한 유저
const props = defineProps(['user']);

const currentTapName = ref('기록');
const othersUser = ref();
const postList = ref([]);
const loading = ref(false);

const onFollow = async () => {
  if (props.user) {
    await addFollow($route?.params?.id as string, props?.user);
  } else {
    alert('로그인이 필요한 서비스입니다.');
  }
};

const onTapChange = (name: string) => {
  currentTapName.value = name;
  postList.value = [];
};

const onUserInfoGet = async () => {
  loading.value = true;
  const data = await fetchUserInfo($route?.params?.id as string);
  othersUser.value = data[0];

  postList.value = await fetchMyPostList($route?.params?.id as string);

  loading.value = false;
};

onMounted(onUserInfoGet);
</script>

<template>
  <Loading v-if="loading" />
  <div class="container" v-if="!loading">
    <div>
      <div class="section">
        <div class="user-info-wrap">
          <img class="user-image" :src="othersUser?.photoURL" alt="" />
        </div>

        <div class="user-record-wrap">
          <div>
            <p :class="{ isVisible: othersUser?.postCount !== 0 }">
              {{ othersUser?.postCount }}
            </p>
            <p class="user-record-text">기록</p>
          </div>
          <span class="line"></span>
          <div>
            <p :class="{ isVisible: othersUser?.followers.length !== 0 }">
              {{ othersUser?.followers?.length }}
            </p>
            <p class="user-record-text">팔로워</p>
          </div>
          <span class="line"></span>
          <div>
            <p :class="{ isVisible: othersUser?.following.length !== 0 }">
              {{ othersUser?.following?.length }}
            </p>
            <p class="user-record-text">팔로잉</p>
          </div>
        </div>
      </div>

      <div
        class="user-name"
        :class="{ userStyle: othersUser?.displayName?.length <= 3 }"
      >
        {{ othersUser?.displayName }}
      </div>

      <div>
        <Button
          :title="`팔로우`"
          :onBtnClick="onFollow"
          style="background-color: black; color: white; margin-bottom: 1rem"
        ></Button>
      </div>

      <Tab
        :currentTapName="currentTapName"
        :onTapChange="onTapChange"
        :names="['기록', '컬렉션']"
      />

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
