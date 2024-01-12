<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  title: String,
  content: String,
  butName: String,
  onClick: Function,
  onCloseModal: Function,
});
</script>

<template>
  <div class="info-container">
    <div class="wrapper">
      <h4 class="title">{{ props.title }}</h4>
      <p class="content">{{ props.content }}</p>

      <div class="button-wrap">
        <button @click="props.onCloseModal">취소</button>
        <button @click="props.onClick">
          {{ butName }}
        </button>
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
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 10;
  color: $black-color;
}

.wrapper {
  width: 330px;
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
  font-weight: 400;
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
