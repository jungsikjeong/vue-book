<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue';
import { useStore } from 'vuex';
import { onUserRouterMove } from '../../../assets/routerMove';

const store = useStore();

const props = defineProps({ postItem: Object });
const content = ref(props.postItem && props.postItem.content);
const user = ref(store.getters['userStore/getUser']);

const onContentUpdate = () => {
  if (content.value) {
    const newContent = content.value.replace(/<[^>]*>/g, '');

    content.value = newContent;
  }
};

onMounted(() => {
  onContentUpdate();
});
</script>

<template>
  <li class="wrapper" v-if="props.postItem">
    <router-link :to="'/' + props.postItem.id + '/post'">
      <div class="image-wrap">
        <img
          :src="props.postItem?.imageUrl[0]?.src"
          :alt="`image${props.postItem.imageUrl[0]?.src}`"
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
        @click="onUserRouterMove(props.postItem.user.uid, user)"
      >
        <img :src="props.postItem.user.photoURL" alt="" class="user-image" />
        <p class="user-name">{{ props.postItem.user.displayName }}</p>
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
  /* object-fit: cover; */
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
