<script setup lang="ts"></script>

<template>
  <div class="container">
    <header class="header">알림</header>

    <div class="not-found">
      <img src="/image/no-alarm.PNG" alt="" />
      <strong>알림이 없습니다.</strong>

      <p>
        댓글,좋아요에 대한 새로운 알림이<br />
        이곳에 표시됩니다.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  padding: 1rem;
}
.header {
  font-weight: bold;
  border: none;
}

.not-found {
  margin: 0 auto;
  padding-top: 10rem;
  text-align: center;

  img {
    margin: 0 auto;
    padding-bottom: 1rem;
    width: 100px;
  }

  p {
    font-size: 0.765rem;
  }
}
</style>
