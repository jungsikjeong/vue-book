<script setup lang="ts">
import { ref, provide, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import Header from '@/components/Header.vue';
import Footer from '@/components/footer/index.vue';

const route = useRoute();
let currentTapName = ref('');

const onTapChange = (name: string) => {
  currentTapName.value = name;
};

provide('currentTapName', { currentTapName, onTapChange });

onMounted(() => {
  const store = useStore();
  store.dispatch('userStore/initAuth');
});
</script>

<template>
  <Header
    :currentTapName="currentTapName"
    :onTapChange="onTapChange"
    v-if="route.path === '/'"
  ></Header>

  <div class="container">
    <router-view></router-view>
    <Footer v-if="route.path !== '/login'"></Footer>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding-bottom: 1.5rem;
}
</style>
