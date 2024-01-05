<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  currentTapName: String,
  handleTapChange: Function,
});
</script>

<template>
  <header class="header">
    <div class="logo"><span>Vue</span>Book</div>

    <ul class="taps">
      <li
        :class="{ active: props.currentTapName === '추천' }"
        class="tap"
        @click="(e) => handleTapChange && handleTapChange(e)"
      >
        <router-link to="/"> 추천 </router-link>
      </li>
      <li
        :class="{ active: props.currentTapName === '팔로잉' }"
        class="tap"
        @click="(e) => handleTapChange && handleTapChange(e)"
      >
        <router-link to="/following"> 팔로잉 </router-link>
      </li>
    </ul>
  </header>
</template>

<style lang="scss">
.header {
  position: relative;
  font-weight: 400;
  font-size: 1rem;
  border-bottom: 1px solid #eee;
  background-color: $white-color;
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
