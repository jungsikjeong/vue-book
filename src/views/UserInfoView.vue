<script setup lang="ts">
import { ref, defineProps } from 'vue';

import Button from '../components/button/index.vue';
import PostItem from '../components/my-page/Post-item.vue';
import Tab from '../components/tab/index.vue';

// TODO 유저의 기록,팔로워,팔로잉 숫자가 1이상이면 텍스트색상 굵게
const currentTapName = ref('기록');
const props = defineProps(['user']);

const onFollow = () => {};
onFollow;

const onTapChange = (name: string) => {
  currentTapName.value = name;
};
</script>

<template>
  <div class="container">
    <div>
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

      <div>
        <Button
          :title="`팔로우`"
          style="background-color: black; color: white; margin-bottom: 1rem"
        ></Button>
      </div>

      <Tab
        :currentTapName="currentTapName"
        :onTapChange="onTapChange"
        :names="['기록', '컬렉션']"
      />

      <div class="section">
        <PostItem />
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
</style>
