<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  title: String,
  content: String,
  onLogout: Function,
});
</script>

<template>
  <div class="info-container">
    <div class="wrapper">
      <h4 class="title">{{ props.title }}</h4>
      <p class="content">{{ props.content }}</p>

      <div class="button-wrap">
        <button @click="props.onLogout">취소</button>
        <button @click="props.onLogout">로그아웃</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.info-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  z-index: 10;
  color: $black-color;
}

.wrapper {
  width: 80%;
  border-radius: 12px;
  padding: 1rem 3rem;
  background-color: $white-color;
}

.title {
  text-align: center;
  font-weight: bold;
}
.content {
  margin-top: 0.5rem;
  text-align: center;
  letter-spacing: -0.1rem;
}

.button-wrap {
  margin-top: 0.5rem;
  text-align: center;
  width: 100%;

  button {
    width: 50%;
    padding: 0.5rem;
    font-size: 0.6rem;
    outline: none;
    border-radius: 5px;
  }

  button:last-child {
    background-color: $black-color;
    color: $white-color;
    font-weight: bold;
  }
}
</style>
