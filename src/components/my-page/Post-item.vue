<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({ postItem: Object });
</script>

<template>
  <router-link :to="'/' + postItem?.id + '/post'">
    <div class="box-wrap" v-if="props.postItem">
      <div class="box">
        <img
          v-for="image in props.postItem.imageUrl"
          :src="image.src"
          :key="image.src"
          alt=""
        />
      </div>

      <h4 class="post-title">{{ postItem && postItem.title }}</h4>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
.box-wrap {
  @media screen and (min-width: 480px) {
    margin-bottom: 1rem;
  }
}

.box {
  @media screen and (min-width: 480px) {
    width: 100%;
    height: 450px;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  color: $cloudy-gray;
  width: 100%;
  height: 240px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    font-size: 0.7rem;
  }
}

.post-add-btn {
  @media screen and (min-width: 480px) {
    height: 450px;
  }

  border: 1px dashed #eee;
}

.post-title {
  font-weight: bold;
}
</style>
