<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue';

import SubTitle from '../sub-title/index.vue';

const props = defineProps({
  searchPostList: Array as any,
});
const noData = ref(false);

onMounted(() => {
  if (props?.searchPostList?.length === 0) {
    noData.value = true;
  } else {
    noData.value = false;
  }
});
</script>

<template>
  <ul class="post-list">
    <SubTitle
      :title="'조회된 포스트가 없습니다.'"
      v-if="
        (noData && searchPostList.length === 0) || searchPostList === undefined
      "
      style="padding-top: 1.5rem; padding-left: 1.5rem"
    />

    <li v-for="item in props.searchPostList" :key="item.id">
      <router-link :to="'/' + item.id + '/post'" class="post-item">
        <div class="img-wrap">
          <img :src="item?.imageUrl[0]?.src" alt="" />
        </div>

        <div class="post-wrap">
          <div class="info-wrap">
            <h4 class="post-title">{{ item.title }}</h4>
            <p class="content">
              {{ item.content.replace(/<[^>]*>/g, '') }}
            </p>
          </div>

          <div class="icon-wrap">
            <font-awesome-icon icon="heart" /> {{ item?.like?.length }}

            <font-awesome-icon icon="comment" /> {{ item?.comments?.length }}

            {{ item.date }}
          </div>

          <div class="user-wrap">
            <img :src="item?.user?.photoURL" alt="" />
            <p>{{ item?.user?.displayName }}</p>
          </div>
        </div>
      </router-link>
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
  height: 6rem;
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.img-wrap {
  width: 6rem;
  height: 6rem;
  flex-shrink: 0;
  border: 0.0625rem solid #ebebeb;

  img {
    width: 100%;
    height: 100%;
    /* object-fit: cover; */
  }
}

.post-wrap {
  display: flex;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;

  .info-wrap {
    .post-title {
      font-weight: bold;
    }

    .content {
      font-size: 0.75rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
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
