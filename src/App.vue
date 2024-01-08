<script setup lang="ts">
import { ref, provide } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Header from '@/components/Header.vue';
import Footer from '@/components/footer/index.vue';

const route = useRoute();
let currentTapName = ref('');

provide('currentTapName', { currentTapName, onTapChange });

function onTapChange(name: string) {
  currentTapName.value = name;
}

const store = useStore();

// 이런식으로 사용
console.log(store.state.userStore.userName);
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
  padding-bottom: 1.5rem;
}
</style>
