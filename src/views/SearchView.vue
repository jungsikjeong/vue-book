<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

import SubTitle from '../components/sub-title/index.vue';
import Tab from '../components/tab/index.vue';
import ResultList from '../components/search/ResultList.vue';
import { fetchSearchPostData, fetchSearchUserData } from '@/api/search';

const focusState = ref(false);
const inputState = ref('');
const isOnSearchBar = ref(false); // 검색어를 누르거나, 엔터를누르면 true가됨
const currentTapName = ref('유저들');
const isLoading = ref(false);

const searchUserList = ref<any[]>([]);
const searchPostList = ref<any[]>([]);

// 인기검색어들
const popularSearch = [
  '운동',
  '그림',
  '취미',
  '공간',
  '사물',
  '독서',
  '취향',
  '여행',
  '아침',
  '저녁',
];

let getKeyword = ref(
  JSON.parse(localStorage.getItem('search-keyword') || '[]')
);

const onTapChange = async (name: string) => {
  currentTapName.value = name;

  if (currentTapName.value === '유저들') {
    isLoading.value = true;
    const result = await fetchSearchUserData(inputState.value);
    if (result?.status === 200) {
      isOnSearchBar.value = true;
      searchUserList.value = result.users;
      isLoading.value = false;
    }
  } else if (currentTapName.value === '기록들') {
    isLoading.value = true;
    const result = await fetchSearchPostData(inputState.value);
    if (result?.status === 200) {
      isOnSearchBar.value = true;
      searchPostList.value = result.posts;
      isLoading.value = false;
    }
  }
  isLoading.value = false;
};

const onSubmit = async (e: any) => {
  const searchTextValue = e.target.value;

  if (searchTextValue) {
    const copyGetKeyword = [...getKeyword.value];

    // 중복 검색어 제거
    const index = copyGetKeyword.indexOf(inputState.value);

    if (index !== -1) {
      copyGetKeyword.splice(index, 1);
    }

    copyGetKeyword.unshift(searchTextValue);

    localStorage.setItem('search-keyword', JSON.stringify(copyGetKeyword));
    getKeyword.value = copyGetKeyword;

    if (currentTapName.value === '유저들') {
      isLoading.value = true;
      const result = await fetchSearchUserData(inputState.value);
      if (result?.status === 200) {
        isOnSearchBar.value = true;
        searchUserList.value = result.users;
        isLoading.value = false;
      }
    } else if (currentTapName.value === '기록들') {
      isLoading.value = true;
      const result = await fetchSearchPostData(inputState.value);
      if (result?.status === 200) {
        isOnSearchBar.value = true;
        searchPostList.value = result.posts;
        isLoading.value = false;
      }
    }
    isLoading.value = false;
    isOnSearchBar.value = true;
  }
};

const onSearchCancel = () => {
  inputState.value = '';
  isOnSearchBar.value = false;
};

// 검색어 클릭
const onSearchWordClick = async (e: any) => {
  inputState.value = e.target.innerText;

  const copyGetKeyword = [...getKeyword.value];

  // 중복 검색어 제거
  const index = copyGetKeyword.indexOf(inputState.value);

  if (index !== -1) {
    copyGetKeyword.splice(index, 1);
  }

  copyGetKeyword.unshift(inputState.value);

  localStorage.setItem('search-keyword', JSON.stringify(copyGetKeyword));
  getKeyword.value = copyGetKeyword;

  if (currentTapName.value === '유저들') {
    isLoading.value = true;
    const result = await fetchSearchUserData(inputState.value);
    if (result?.status === 200) {
      isOnSearchBar.value = true;
      searchUserList.value = result.users;
      isLoading.value = false;
    }
  } else if (currentTapName.value === '기록들') {
    isLoading.value = true;
    const result = await fetchSearchPostData(inputState.value);
    if (result?.status === 200) {
      isOnSearchBar.value = true;
      searchPostList.value = result.posts;
      isLoading.value = false;
    }
  }
  isLoading.value = false;
  isOnSearchBar.value = true;
};

// 최근 검색어 삭제
const onKeywordRemove = (keyword: string) => {
  const copyGetKeyword = [...getKeyword.value];
  const test = copyGetKeyword.findIndex((element) => element === keyword);
  if (test != -1) {
    copyGetKeyword.splice(test, 1);
    localStorage.setItem('search-keyword', JSON.stringify(copyGetKeyword));
    getKeyword.value = copyGetKeyword;
  }
};

// 검색어 전체 지우기
const onAllRemove = () => {
  localStorage.setItem('search-keyword', '');
  getKeyword.value = '';
  inputState.value = '';
  isOnSearchBar.value = false;
};

const onClickOutside = (e: any) => {
  if (e.target.classList.contains('search-input') || inputState.value !== '') {
    // 검색창을 클릭시
    focusState.value = true;
  } else {
    // 검색창외에 다른 곳 클릭시
    focusState.value = false;
  }
};

onMounted(() => {
  window.addEventListener('click', onClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('click', onClickOutside);
});
</script>

<template>
  <div class="container">
    <section class="wrapper" :class="{ fixed: isOnSearchBar }">
      <input
        type="text"
        placeholder="&#xF002; 뷰북의 기록들을 검색해보세요"
        :class="{ active: focusState }"
        class="search-input"
        @keydown.enter="onSubmit"
        v-model="inputState"
      />
      <button
        class="cancel-btn"
        :class="{ 'active-cancel-btn': focusState }"
        @click="onSearchCancel"
      >
        취소
      </button>
      <Tab
        :currentTapName="currentTapName"
        :onTapChange="onTapChange"
        :names="['유저들', '기록들']"
        v-if="isOnSearchBar"
        style="margin-top: 1rem"
      />
    </section>

    <!-- 검색한 결과물 -->
    <ResultList
      v-if="isOnSearchBar"
      :searchUserList="searchUserList"
      :searchPostList="searchPostList"
      :currentTapName="currentTapName"
      :isLoading="isLoading"
    />

    <!-- 최근 검색어 -->
    <section class="wrapper" v-if="getKeyword.length > 0 && !isOnSearchBar">
      <div class="flex-box">
        <SubTitle :title="`최근 검색어`"></SubTitle>
        <button class="remove-all-btn" @click="onAllRemove">모두 지우기</button>
      </div>

      <ul class="tags">
        <li class="tag" v-for="keyword in getKeyword" :key="keyword">
          <span @click="onSearchWordClick">
            {{ keyword }}
          </span>
          <button class="close-btn" @click="onKeywordRemove(keyword)">X</button>
        </li>
      </ul>
    </section>

    <!-- 인기 검색어 -->
    <section class="wrapper" v-if="!isOnSearchBar">
      <SubTitle :title="`인기 검색어`"></SubTitle>

      <ul class="tags">
        <li
          class="tag"
          @click="onSearchWordClick"
          v-for="data in popularSearch"
          :key="data"
        >
          {{ data }}
        </li>
      </ul>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.fixed {
  position: sticky;
  top: 0rem;
  margin-top: 0rem !important;
  max-width: 40rem;
  background-color: #fff;

  input {
    margin-top: 1rem;
  }
}

.container {
  padding: 1rem;
  max-width: 40rem;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 0.5rem 1rem;
  outline: none;
  border: 1px solid #eee;
  border-radius: 5px;
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  font-size: 0.875rem;
  color: #333;

  &::placeholder {
    color: #333;
    opacity: 0.5;
  }
}

.cancel-btn {
  display: none;
  width: 10%;
  padding: 0.5rem 0;
  font-size: 0.875rem;
  text-align: right;
  color: $black-color;
  font-weight: bold;
}

.active-cancel-btn {
  display: inline;
}

.close-btn {
  cursor: pointer;
  color: $cloudy-gray;
  margin-left: 0.5rem;
  width: 16px;
  height: 16px;
}

.active {
  width: 90%;
}

.wrapper {
  margin-top: 1rem;
}

.flex-box {
  display: flex;
  align-items: center;
}

.remove-all-btn {
  font-weight: bold;
  font-size: $heading6-size;
  margin-left: auto;
  margin-bottom: 1rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.tag {
  padding: 0.3rem 0.5rem;
  font-size: 0.7rem;
  color: #333;
  border: 1px solid #eee;
  border-radius: 25px;
  cursor: pointer;
}
</style>
