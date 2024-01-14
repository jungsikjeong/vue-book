<script setup lang="ts">
import { onMounted } from 'vue';
import router from '@/router';
import { fetchKakaoAuth } from '../../api/auth';

import Loading from '../../components/Loading.vue';

onMounted(() => {
  const fetchData = async () => {
    try {
      await fetchKakaoAuth();

      alert('로그인 성공!');
      router.replace('/');
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    }
  };

  fetchData();
});
</script>

<template>
  <Loading />
</template>

<style scoped lang="scss"></style>
