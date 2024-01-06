<script setup lang="ts">
import { ref } from 'vue';

let dataId = ref('0');

function handleCurrentPage(e: any) {
  dataId.value = e.currentTarget.dataset.id;
}
</script>

<template>
  <div class="container">
    <ul class="icons-list">
      <li
        :class="{ current: dataId === '0' }"
        @click="handleCurrentPage"
        data-id="0"
      >
        <router-link to="/">
          <font-awesome-icon :icon="['fas', 'house']" />
        </router-link>
      </li>

      <li
        :class="{ current: dataId === '1' }"
        @click="handleCurrentPage"
        data-id="1"
      >
        <router-link to="/search">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
        </router-link>
      </li>

      <button class="writer-button" @click="handleCurrentPage" data-id="2">
        <router-link to="/writer">
          <font-awesome-icon :icon="['fas', 'plus']" />
        </router-link>
      </button>

      <li
        :class="{ current: dataId === '3' }"
        @click="handleCurrentPage"
        data-id="3"
      >
        <router-link to="/notification">
          <font-awesome-icon icon="bell" />
        </router-link>
      </li>

      <li
        :class="{ current: dataId === '4' }"
        @click="handleCurrentPage"
        data-id="4"
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
  max-width: 450px;
  width: 100%;
  height: 55px;
  padding: 1rem;

  background-color: $white-color;
  box-shadow: 0px -1px 5px rgba(0, 0, 0, 0.1);
  font-size: 1.1rem;
}
.icons-list {
  display: flex;
  align-items: center;
  justify-content: space-around;

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
