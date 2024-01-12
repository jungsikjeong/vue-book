<script setup lang="ts">
const REST_API_KEY = process.env.VUE_APP_KAKAO_REST_API;
const REDIRECT_URI = 'http://localhost:8080/callback/kakaotalk';
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
</script>

<template>
  <a :href="KAKAO_AUTH_URL">
    <img
      class="pointer"
      src="../../../public/image/kakao_login_btn.png"
      alt=""
    />
  </a>
</template>

<style scoped lang="scss"></style>
