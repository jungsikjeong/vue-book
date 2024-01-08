<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/footer/index.vue';
import { ref, provide } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
let currentTapName = ref('');

provide('currentTapName', { currentTapName, onTapChange });

function onTapChange(name: string) {
  currentTapName.value = name;
}
</script>

<template>
  <Header
    :currentTapName="currentTapName"
    :onTapChange="onTapChange"
    v-if="route.path === '/'"
  ></Header>

  <div class="container">
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 40rem;
  margin: 0 auto;
  padding-bottom: 1.5rem;
}
</style>
