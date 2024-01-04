<template>
  <header class="header">
    <div class="logo"><span>Vue</span>Book</div>

    <ul class="taps">
      <li
        :class="{ active: currentTapName === '추천' }"
        class="tap"
        @click="currentTap"
      >
        추천
      </li>
      <li
        :class="{ active: currentTapName === '팔로잉' }"
        class="tap"
        @click="currentTap"
      >
        팔로잉
      </li>
    </ul>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';

let currentTapName = ref('추천');

function currentTap(e: any) {
  currentTapName.value = e.target.outerText;
}
</script>

<style lang="scss">
.header {
  font-weight: 400;
  font-size: 1rem;
  border-bottom: 1px solid #eee;
}

.logo {
  padding: 0.5rem;

  span {
    font-family: 'Rubik Maps', system-ui;
  }
}

.taps {
  position: relative;
  display: flex;
  padding: 0 1rem;
  width: 100%;

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
