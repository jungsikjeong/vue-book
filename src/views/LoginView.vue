<script setup lang="ts">
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/navigation';

const modules = ref([Navigation, Pagination, Autoplay]);

const slides = ref([
  {
    id: 1,
    src: 'login01_640',
    title: '가벼운 기록',
    content: '가정의 순간들을 기록해보세요',
  },
  {
    id: 2,
    src: 'login02_640',
    title: '더 나은 나',
    content: '일상의 꾸준함이 나를 더 단단하게 지켜줍니다.',
  },
  {
    id: 3,
    src: 'login03_640',
    title: '영감의 교류',
    content: '오늘을 함께 달리는 사람들을 만나보세요',
  },
]);

const currentSlide = ref(slides.value[0]);

const updateCurrentSlide = (e: any) => {
  currentSlide.value = slides.value[e.realIndex];
};
</script>

<template>
  <div class="container">
    <div class="section">
      <h3 class="title">{{ currentSlide.title }}</h3>

      <p class="content">{{ currentSlide.content }}</p>
    </div>

    <swiper
      :rewind="true"
      :navigation="false"
      :modules="modules"
      :loop="true"
      :pagination="{
        clickable: false,
      }"
      :autoplay="{ delay: 2500, disableOnInteraction: false }"
      @slideChange="updateCurrentSlide"
      :threshold="0.01"
      :style="{
        '--swiper-pagination-color': 'black',
        '--swiper-pagination-bullet-inactive-color': 'gray',
        '--swiper-pagination-bullet-inactive-opacity': '1',
        '--swiper-pagination-bullet-size': '8px',
      }"
      class="login-swiper"
    >
      <swiper-slide v-for="slide in slides" :key="slide.id">
        <div class="image-wrap">
          <img :src="`/image/${slide.src}.png`" alt="" class="swiper-img" />
        </div>
      </swiper-slide>
    </swiper>

    <div class="section">
      <img
        class="pointer"
        src="../../public/image/kakao_login_btn.png"
        alt=""
      />
      <br />
      <p class="text pointer">둘러보기</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 40rem;
  margin: 0 auto;
  padding-top: 5rem;
}

.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  .title {
    font-weight: bold;
  }

  .content {
    line-height: 30px;
  }

  .text {
    color: #bbb;
    transition: all 0.3s ease;
    padding: 0rem 0.5rem;

    &:hover {
      color: #333;
    }
  }
}

.swiper {
  position: relative;
  width: 290px;
  height: 350px;
  margin: 0 auto;
}

.image-wrap {
  position: absolute;
  bottom: 5rem;
  width: 100%;
  height: 200px;
  margin: 0 auto;
}
.swiper-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
