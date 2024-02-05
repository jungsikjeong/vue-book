<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/navigation';
import { onUserRouterMove } from '../../assets/routerMove';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps(['postItem']);

const modules = ref([Navigation, Pagination]);
const currentPage = ref(1);
const TextLimitLength = ref(150);
const showMoreBtn = ref(false);
const isMoreContent = ref(false);
const user = ref(store.getters['userStore/getUser']);

onMounted(() => {
  if (props?.postItem?.content?.length >= TextLimitLength.value) {
    showMoreBtn.value = true;
  }
});
</script>

<template>
  <swiper
    :rewind="true"
    :navigation="false"
    :modules="modules"
    :loop="true"
    @slide-change="
      (e) => {
        currentPage = e.realIndex + 1;
      }
    "
    :autoplay="{ delay: 2500, disableOnInteraction: false }"
    class="post-detail-slider"
  >
    <swiper-slide
      v-for="(image, index) in props?.postItem.imageUrl"
      :key="index"
    >
      <div class="image-wrap">
        <img :src="image.src" />
      </div>
    </swiper-slide>
    <div class="pagination">
      {{ currentPage }}/{{ props?.postItem?.imageUrl?.length }}
    </div>
  </swiper>

  <div class="post-wrap">
    <h3 class="post-title">{{ props?.postItem?.title }}</h3>
    <p class="post-date">{{ props?.postItem.createdAt.slice(0, 11) }}</p>

    <div :class="isMoreContent ? 'more-content' : 'post-content'">
      <div
        class="more-btn"
        v-if="showMoreBtn"
        @click="(showMoreBtn = false), (isMoreContent = true)"
      >
        ... <strong>더보기</strong>
      </div>

      <p v-html="props?.postItem?.content"></p>
    </div>

    <ul class="post-tags">
      <li class="post-tags__tag" v-for="tag in props?.postItem.tags" :key="tag">
        {{ '#' + tag }}
      </li>
    </ul>

    <div
      class="post-user pointer"
      @click="onUserRouterMove(props.postItem?.uid, user)"
    >
      <img :src="props?.postItem?.user?.photoURL" alt="" />
      {{ props?.postItem?.user?.displayName }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.label {
  position: absolute;
  top: 8px;
  right: 10px;
  background-color: $orange-color;
  padding: 5px 8px;
  border-radius: 2.5px;
  font-size: 0.6rem;
  font-weight: bold;
}
.pagination {
  z-index: 10;
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.5);
  color: $white-color;
  font-weight: 700;
  padding: 0.375rem 0.625rem;
  border-radius: 0.9375rem;
}

.image-wrap {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 75%;
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.post-wrap {
  @media screen and (max-width: 480px) {
    padding: 1rem 0.2rem 0rem;
  }
  padding: 1.5rem 1.5rem 0rem;
  color: $black-color;

  .post-title {
    font-weight: bold;
    text-decoration: $black-color wavy underline;
  }

  .post-date {
    opacity: 0.8;
    margin-bottom: 1.2rem;
  }

  .post-content {
    font-size: 0.875rem;
    font-weight: 500;
    max-height: 5.25rem;
    word-break: break-word;
    white-space: pre-line;
    overflow: hidden;
  }
  .moreContentStyle {
    max-height: none;
    overflow: auto;
    text-overflow: clip;
    display: block;
  }

  .post-tags {
    padding: 01.5rem 0;
    display: flex;
    gap: 5px;

    .post-tags__tag {
      font-weight: 600;
      border: 1px solid #bbb;
      border-radius: 15px;
      padding: 0.3rem 0.5rem;
      font-size: 0.75rem;
    }
  }

  .post-user {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.85rem;
    color: #333;
    font-weight: 600;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
    img {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .more-btn {
    float: right;
    font-weight: bold;
    color: $black-color;
    line-height: 140%;
    font-weight: 700;
    font-size: 0.875rem;
    display: flex;
    align-items: flex-end;
    height: 84px;
    shape-outside: circle(50%);
    cursor: pointer;
  }
}
</style>
