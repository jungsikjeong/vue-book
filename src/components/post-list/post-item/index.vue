<script setup lang="ts">
import { defineProps } from 'vue';

const data = defineProps({ postItem: Object });
</script>

<template>
  <li class="wrapper" v-if="data.postItem">
    <div class="image-wrap">
      <img
        :src="image"
        :alt="`image${data.postItem.id}`"
        v-for="image in data.postItem.images"
        :key="image"
        class="main-image"
      />
    </div>

    <div class="text-wrap">
      <h5 class="title">
        {{ data.postItem.title }}
      </h5>
      <p class="content">
        {{ data.postItem.content }}
      </p>

      <div class="user-wrap">
        <img
          src="https://picsum.photos/414/414?random=4"
          alt=""
          class="user-image"
        />
        <p class="user-name">춤추는기린</p>
      </div>
    </div>
  </li>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 48%;
  color: $black-color;
  padding-top: 0rem;
  cursor: pointer;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text-wrap {
  padding: 0.5rem 0rem;
}

.content {
  font-size: 0.75rem;
  padding: 0.5rem 0;
  height: 45px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.user-wrap {
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 5px;
}

.user-image {
  width: 15px;
  height: 15px;
  border-radius: 50%;
}

.user-name {
  font-size: 0.7rem;
  font-weight: 500;
}

.title {
  font-weight: bold;
}
</style>
