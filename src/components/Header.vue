<script setup lang="ts"></script>

<template>
  <header class="header">
    <div class="logo">
      <router-link to="/"><span>Vue</span>Book</router-link>
    </div>

    <ul class="taps">
      <router-link to="/">
        <li class="tap" :class="{ active: $route.path === '/' }">추천</li>
      </router-link>
      <router-link to="/following">
        <li class="tap" :class="{ active: $route.path === '/following' }">
          팔로잉
        </li>
      </router-link>
    </ul>
  </header>
</template>

<style lang="scss">
.header {
  position: relative;
  max-width: 40rem;
  margin: 0 auto !important;
  font-weight: 400;
  font-size: 1rem;
  border-bottom: 1px solid #eee;
  background-color: $white-color;
}

.logo {
  padding: 0.5rem;

  span {
    font-family: 'Rubik Maps', system-ui;
  }
}

.taps {
  position: relative;
  display: flex;
  padding: 0 1rem;
  width: 100%;
  font-size: 0.875rem;

  .tap {
    padding: 0 0.5rem;
    padding-bottom: 0.2rem;
    cursor: pointer;
  }
}
.active {
  font-weight: 600;
  padding-bottom: 0.2rem;
  border-bottom: 2px solid black;
}
</style>
