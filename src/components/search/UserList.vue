<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue';

import SubTitle from '../sub-title/index.vue';

const props = defineProps({
  searchUserList: Array as any,
});
const noData = ref(false);

onMounted(() => {
  if (props?.searchUserList?.length === 0) {
    noData.value = true;
  } else {
    noData.value = false;
  }
});
</script>

<template>
  <ul class="user-list">
    <SubTitle
      :title="'조회된 해당 유저가 없습니다.'"
      v-if="
        (noData && searchUserList.length === 0) || searchUserList === undefined
      "
    />

    <li v-for="user in props.searchUserList" :key="user.id">
      <router-link :to="'/' + user.uid + '/user'" class="user-item">
        <div class="img-wrap">
          <img :src="user.photoURL" alt="" />
        </div>

        <div class="user-wrap">
          <h4 class="user-name">{{ user.displayName }}</h4>

          <p class="user-content">{{ user.description }}</p>

          <div class="icon-wrap">
            <font-awesome-icon icon="user" />
            {{ user.followers.length }}

            <font-awesome-icon :icon="['fas', 'list-check']" />
            {{ user.postCount }}
          </div>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.user-list {
  margin-bottom: 1.5rem;
  padding: 1.5rem 1.5rem 0;
  display: flex;
  flex-wrap: wrap;
}

.user-item {
  .user-item:not(:first-child) {
    margin-top: 1.3rem;
  }

  width: 100%;
  display: flex;
  gap: 10px;
}

.img-wrap {
  width: 60px;
  height: 60px;
  border: 0.0625rem solid #ebebeb;
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

  .user-name {
    font-weight: bold;
  }
  .user-content {
    font-size: 0.875rem;
    color: #101010;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
</style>
