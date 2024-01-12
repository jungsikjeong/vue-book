<script setup lang="ts">
import { inject } from 'vue';

interface FooterProps {
  // eslint-disable-next-line no-unused-vars
  onTapChange: (name: string) => void;
}

const { onTapChange } = inject<FooterProps>('currentTapName', {
  onTapChange: () => {},
});
</script>

<template>
  <div class="container">
    <ul class="footer-list">
      <li :class="{ current: $route.path === '/' }" @click="onTapChange('')">
        <router-link to="/">
          <font-awesome-icon :icon="['fas', 'house']" />
        </router-link>
      </li>

      <li
        :class="{ current: $route.path === '/search' }"
        @click="onTapChange('')"
        data-id="1"
      >
        <router-link to="/search">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
        </router-link>
      </li>

      <button class="writer-button" @click="onTapChange('')">
        <router-link to="/writer">
          <font-awesome-icon :icon="['fas', 'plus']" />
        </router-link>
      </button>

      <li
        :class="{ current: $route.path === '/notification' }"
        @click="onTapChange('')"
      >
        <router-link to="/notification">
          <font-awesome-icon icon="bell" />
        </router-link>
      </li>

      <li
        :class="{ current: $route.path === '/myPage' }"
        @click="onTapChange('')"
      >
        <router-link to="/myPage">
          <font-awesome-icon icon="user" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 55px;
  padding: 1rem;
  background-color: $white-color;
  font-size: 1.1rem;
}
.footer-list {
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-width: 40rem;
  margin: 0 auto;
  li {
    cursor: pointer;
  }
}

.writer-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  color: $white-color;
  background-color: $black-color;
  border-radius: 50%;
}

.current {
  transition: all 0.3s ease-in-out;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid $black-color;
}
</style>
