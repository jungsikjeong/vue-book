<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import SubTitle from '../components/sub-title/index.vue';
// TODO 검색어 클릭시 바로 검색되게끔

const focusState = ref(false);
const inputState = ref('');

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

function onSubmit(e: any) {
  const searchTextValue = e.target.value;

  if (searchTextValue) {
    const copyGetKeyword = [...getKeyword.value];

    copyGetKeyword.unshift(searchTextValue);

    localStorage.setItem('search-keyword', JSON.stringify(copyGetKeyword));
    getKeyword.value = copyGetKeyword;
    e.target.value = '';
  }
}

function onSearchCancel() {
  inputState.value = '';
}

// 검색어 클릭
function onSearchWordClick(e: any) {
  inputState.value = e.target.innerText;
}

// 검색어 전체 지우기
function onAllRemove() {
  localStorage.setItem('search-keyword', '');
  getKeyword.value = '';
  inputState.value = '';
}

function onClickOutside(e: any) {
  if (e.target.classList.contains('search-input') || inputState.value !== '') {
    // 검색창을 클릭시
    focusState.value = true;
  } else {
    // 검색창외에 다른 곳 클릭시
    focusState.value = false;
  }
}

onMounted(() => {
  window.addEventListener('click', onClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('click', onClickOutside);
});
</script>

<template>
  <div class="container">
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

    <section class="wrapper" v-if="getKeyword.length > 0">
      <div class="flex-box">
        <SubTitle :title="`최근 검색어`"></SubTitle>
        <button class="remove-all-btn" @click="onAllRemove">모두 지우기</button>
      </div>
      <ul class="tags">
        <li
          class="tag"
          v-for="keyword in getKeyword"
          :key="keyword"
          @click="onSearchWordClick"
        >
          {{ keyword }}
        </li>
      </ul>
    </section>

    <section class="wrapper">
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
