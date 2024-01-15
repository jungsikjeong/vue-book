<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  dummyPosts: Array as any,
});
</script>

<template>
  <ul class="post-list">
    <li v-for="item in props.dummyPosts" :key="item.id" class="post-item">
      <div class="img-wrap">
        <img :src="item.fileUrl" alt="" />
      </div>

      <div class="post-wrap">
        <div class="info-wrap">
          <h4 class="post-name">{{ item.title }}</h4>
          <p>{{ item.content }}</p>
        </div>

        <div class="icon-wrap">
          <font-awesome-icon icon="heart" /> {{ item.likeCount }}

          <font-awesome-icon icon="comment" /> {{ item.commentCount }}

          {{ item.date }}
        </div>

        <div class="user-wrap">
          <img :src="item.user.photoURL" alt="" />
          <p>{{ item.user.displayName }}</p>
        </div>
      </div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.post-list {
  margin-bottom: 1.5rem;
  display: flex;
  flex-wrap: wrap;
}

.post-item {
  margin-top: 1.3rem;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.img-wrap {
  width: 6rem;
  height: 6rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.info-wrap {
  .post-name {
    font-weight: bold;
  }
}

.post-wrap {
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

.user-wrap {
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
  color: $black-color;

  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    object-fit: cover;
  }
}
</style>
