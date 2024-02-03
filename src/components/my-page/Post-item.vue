<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({ postItem: Object, handlePostDelete: Function });
const user = ref(store.getters['userStore/getUser']);
const isEdit = ref(false);

const onRemove = () => {
  if (props.handlePostDelete && props.postItem) {
    props.handlePostDelete(props.postItem.id);
  }
};

onMounted(() => {
  if (props?.postItem) {
    isEdit.value = props.postItem.uid === user?.value?.uid;
  }
});
</script>

<template>
  <div class="box-wrap" v-if="props.postItem">
    <router-link :to="'/' + postItem?.id + '/post'">
      <div class="box">
        <img
          :src="props.postItem.imageUrl[0].src"
          :key="props.postItem.imageUrl[0].src"
          alt=""
        />
      </div>
    </router-link>

    <div class="content-wrap">
      <h4 class="post-title">{{ postItem && postItem.title }}</h4>
      <template v-if="isEdit">
        <router-link :to="'/post/edit/' + postItem?.id">
          <span>수정</span>
        </router-link>
        <span @click="onRemove">삭제</span>
      </template>
    </div>
  </div>
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
.content-wrap {
  display: flex;
  align-items: center;
  gap: 5px;

  span {
    color: #666;
    font-size: 0.8rem;
    cursor: pointer;
  }
}

.post-title {
  font-weight: bold;
}
</style>
