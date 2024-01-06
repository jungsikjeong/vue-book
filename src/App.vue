<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/footer/index.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
let currentTapName = ref('추천');

function handleTapChange(name: string) {
  currentTapName.value = name;
}
</script>

<template>
  <Header
    :currentTapName="currentTapName"
    :handleTapChange="handleTapChange"
    v-if="route.path === '/'"
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
