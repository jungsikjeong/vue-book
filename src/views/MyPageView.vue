<script setup lang="ts">
import { inject, ref } from 'vue';
import SettingModal from '../components/setting-modal/index.vue';

// TODO 유저의 기록,팔로워,팔로잉 숫자가 1이상이면 텍스트색상 굵게

interface MyPageViewProps {
  currentTapName: string;

  // eslint-disable-next-line no-unused-vars
  onTapChange: (name: string) => void;
}

const { currentTapName, onTapChange } = inject<MyPageViewProps>(
  'currentTapName',
  { currentTapName: '', onTapChange: () => {} }
);

const modalState = ref(false);

function onModalOpen() {
  modalState.value = !modalState.value;
}
</script>

<template>
  <div class="container">
    <SettingModal
      :onModalOpen="onModalOpen"
      :modalState="modalState"
      :class="modalState ? 'open' : 'close'"
    />

    <div class="myPage-header">
      <font-awesome-icon :icon="['fas', 'gear']" @click="onModalOpen" />
    </div>

    <div class="section flex-box">
      <div class="user-info-wrap">
        <img
          class="user-image"
          src="https://post-phinf.pstatic.net/MjAyMjA3MjJfMTk2/MDAxNjU4NDcyMTk2NTcw.jZoVZZWQgyt0XMrxEMpHPVChhKRS9tOx-Cdwn2Jee68g.l-3xnhNzAuLwO4pa-0gZf5hs5zzfEtKuPtVHM29gcxog.JPEG/220721_%EC%97%90%EC%8A%A4%ED%8C%8C_%EC%B9%B4%EB%A6%AC%EB%82%98_3.jpg?type=w800_q75"
          alt=""
        />
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

    <div class="user-name">센스있는오리139</div>

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
  </div>
</template>

<style lang="scss" scoped>
.container {
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
