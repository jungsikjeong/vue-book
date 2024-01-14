<script setup lang="ts">
import { onMounted, watchEffect, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import Header from '@/components/Header.vue';
import Footer from '@/components/footer/index.vue';

const route = useRoute();
const store = useStore();
const user = ref(store.getters['userStore/getUser']);

onMounted(async () => {
  watchEffect(() => {
    // 로그아웃했을때를 대비해서
    const newUser = store.getters['userStore/getUser'];
    user.value = newUser;
  });

  await store.dispatch('userStore/initAuth');
});
console.log(user.value);
</script>

<template>
  <Header v-if="route.path === '/' || route.path === '/following'"></Header>

  <div class="container">
    <router-view :user="user"></router-view>
    <Footer v-if="route.path !== '/login'"></Footer>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding-bottom: 1.5rem;
}
</style>
