<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import { fetchFollowingList } from '@/api/following';

const paramsId = useRoute().params.id;

const followerList = ref<any[]>([]);

const getUserInfo = async () => {
  const result = await fetchFollowingList(paramsId as string);

  if (result?.status === 200) {
    followerList.value = result.data;
    console.log(followerList.value);
  }
};

const onGoBack = () => {
  router.go(-1);
};

onMounted(getUserInfo);
</script>
<template>
  <div class="container">
    <div class="header">
      <span class="back-btn pointer" @click="onGoBack">
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 18.5L9 12.5L15 6.5"
            stroke="#101010"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </span>

      팔로잉
    </div>

    <ul class="user-list">
      <li v-for="user in followerList" :key="user.id">
        <router-link :to="'/' + user.uid + '/user'" class="user-item">
          <div class="img-wrap">
            <img :src="user.photoURL" alt="" />
          </div>

          <div class="user-wrap">
            <h4 class="user-name">{{ user.displayName }}</h4>

            <p class="user-content">{{ user.description }}</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 40rem;
  margin: 0 auto;
  padding: 0.5rem 1rem;
}

.header {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1rem;
  border: none;
  gap: 10px;
}

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
</style>
