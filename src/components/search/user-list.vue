<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  dummyUsers: Array as any,
});

console.log(props.dummyUsers);
</script>

<template>
  <ul class="user-list">
    <li v-for="item in props.dummyUsers" :key="item.id" class="user-item">
      <div class="img-wrap">
        <img :src="item.photoURL" alt="" />
      </div>

      <div class="user-wrap">
        <h4 class="user-name">{{ item.displayName }}</h4>

        <div class="icon-wrap">
          <font-awesome-icon icon="user" />
          {{ item.followersCount }}

          <font-awesome-icon :icon="['fas', 'list-check']" />
          {{ item.postCount }}
        </div>
      </div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.user-list {
  margin-bottom: 1.5rem;
  display: flex;
  flex-wrap: wrap;
}

.user-item {
  margin-top: 1.3rem;
  width: 100%;
  display: flex;
  gap: 10px;

  .user-name {
    font-weight: bold;
  }
}

.img-wrap {
  width: 60px;
  height: 60px;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}

.user-wrap {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.icon-wrap {
  margin-top: 0.3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: $cloudy-gray;
}
</style>
