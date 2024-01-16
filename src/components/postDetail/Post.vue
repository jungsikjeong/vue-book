<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/navigation';

const modules = ref([Navigation, Pagination]);
const currentPage = ref(1);
const TextLimitLength = ref(196);
const showMoreBtn = ref(false);
const isMoreContent = ref(false);

onMounted(() => {
  if (slides.value[0].content.length >= TextLimitLength.value) {
    showMoreBtn.value = true;
  }
});

const slides = ref([
  {
    id: '1',
    src: 'data:image/jpeg;base64,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',
    title: '일주일의 커피♨',
    content: ` They must often change who would be constant in happiness or wisdom They
        must often change who would be constant in happiness or wisdomThey must
        often change who would be constant in happiness or wisdomThey must often
        change who would be constant in happiness or wisdomThey must often
        change who would be constant in happiness or wisdomThey must often
        change who would be constant in happiness or wisdomThey must often
        change who would be constant in happiness or wisdomvThey must often
        change who would be constant in happiness or wisdomThey must often
        change who would be constant in happiness or wisdom`,
    user: 'Aine님이 새벽에 하는 생각들',
  },
  {
    id: '2',
    src: 'https://i.ytimg.com/vi/lmU6q4JaBfE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBc_WWWRwdU4Lw_fhpmdjVYWB6emw',
    title: '일주일의 커피♨2',
    content: '하루 한 끼,나를 위한 테이블 기록',
    user: 'Aine님이 새벽에 하는 생각들',
  },
  {
    id: ' 3',
    src: 'https://contents-cdn.viewus.co.kr/image/2024/01/CP-2023-0095/image-0a81dd3d-fb90-4b6e-b1f5-b979c153f35b.jpeg',
    title: '일주일의 커피♨3',
    content: '하루 한 끼,나를 위한 테이블 기록',
    user: 'Aine님이 새벽에 하는 생각들',
  },
  {
    id: ' 4',
    src: 'https://cdn.hankooki.com/news/photo/202311/118634_162305_1700390997.jpg',
    title: '일주일의 커피♨4',
    content: '하루 한 끼,나를 위한 테이블 기록',
    user: 'Aine님이 새벽에 하는 생각들',
  },
]);
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
    <swiper-slide v-for="slide in slides" :key="slide.id">
      <div class="image-wrap">
        <img :src="slide.src" />
      </div>
    </swiper-slide>
    <div class="pagination">{{ currentPage }}/{{ slides.length }}</div>
  </swiper>

  <div class="post-wrap">
    <h3 class="post-title">마음의 균형찾기</h3>
    <p class="post-date">1월 13일 토요일</p>

    <div :class="isMoreContent ? 'more-content' : 'post-content'">
      <div
        class="more-btn"
        v-if="showMoreBtn"
        @click="(showMoreBtn = false), (isMoreContent = true)"
      >
        ... <strong>더보기</strong>
      </div>

      {{ slides[0].content }}
    </div>

    <ul class="post-tags">
      <li class="post-tags__tag">#마균찾</li>
    </ul>

    <div class="post-user">
      <img src="https://pbs.twimg.com/media/F9vT_m7bkAAYXMN.jpg:large" alt="" />
      잡초
    </div>
  </div>
</template>

<style scoped lang="scss">
header {
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
