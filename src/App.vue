<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/footer/index.vue';
import { ref } from 'vue';

let currentTapName = ref('추천');

function handleTapChange(e: any) {
  currentTapName.value = e.target.outerText;
}
</script>

<template>
  <Header
    :currentTapName="currentTapName"
    :handleTapChange="handleTapChange"
  ></Header>

  <div class="container">
    <router-view></router-view>
  </div>

  <Footer></Footer>
</template>

<style lang="scss" scoped>
.container {
  padding-bottom: 1.5rem;
}
</style>
