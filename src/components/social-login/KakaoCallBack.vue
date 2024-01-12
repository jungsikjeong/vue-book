<script setup lang="ts">
import { onMounted } from 'vue';
import router from '@/router';
import { fetchKakaoAuth } from '../../api/auth';

onMounted(() => {
  const fetchData = async () => {
    try {
      await fetchKakaoAuth();

      router.replace('/');
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    }
  };

  fetchData();
});
</script>

<template>KakaoCallback</template>

<style scoped lang="scss"></style>
