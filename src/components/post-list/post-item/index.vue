<script setup lang="ts">
import router from '@/router';
import { ref, defineProps } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({ postItem: Object });
const content = ref(props.postItem && props.postItem.content.insert);
const user = ref(store.getters['userStore/getUser']);

const onUserRouterMove = (userId: string) => {
  if (userId === user.value.uid) {
    return router.push('/myPage');
  } else {
    return router.push('/' + userId + '/user');
  }
};
</script>

<template>
  <li class="wrapper" v-if="props.postItem">
    <router-link :to="'/' + props.postItem.id + '/post'">
      <div class="image-wrap">
        <img
          v-for="image in props.postItem.imageUrl"
          :src="image.src"
          :alt="`image${image.src}`"
          :key="image"
          class="main-image"
        />
      </div>
    </router-link>

    <div class="text-wrap">
      <router-link :to="'/' + props.postItem.id + '/post'">
        <h5 props="title">
          {{ props.postItem.title }}
        </h5>
        <p class="content">{{ content }}</p>
      </router-link>

      <div
        class="user-wrap pointer"
        @click="onUserRouterMove(props.postItem.user[0].uid)"
      >
        <img :src="props.postItem.user[0].photoURL" alt="" class="user-image" />
        <p class="user-name">{{ props.postItem.user[0].displayName }}</p>
      </div>
    </div>
  </li>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 48%;
  color: $black-color;
  padding-top: 0rem;
}
.image-wrap {
  position: relative;
  width: 100%;
  padding-top: 75%;
}

.main-image {
  position: absolute;
  top: 0;
  left: 0;
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
