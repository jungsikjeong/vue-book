<script setup lang="ts">
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/navigation';

const modules = ref([Navigation, Pagination]);

const slides = ref([
  {
    id: 1,
    src: 'https://d25rzgv0ld7qzl.cloudfront.net/media/29709/acdh07k00590658e6a588e55a6ffaad0',
    title: '일주일의 커피♨',
    content: '하루 한 끼,나를 위한 테이블 기록',
    user: 'Aine님이 새벽에 하는 생각들',
  },
  {
    id: 2,
    src: 'https://cdn.kagit.kr/2023/08/01/webp_image_90f99b7c8d.webp',
    title: '일주일의 커피♨2',
    content: '하루 한 끼,나를 위한 테이블 기록',
    user: 'Aine님이 새벽에 하는 생각들',
  },
  {
    id: 3,
    src: 'https://picsum.photos/414/414?random=3',
    title: '일주일의 커피♨3',
    content: '하루 한 끼,나를 위한 테이블 기록',
    user: 'Aine님이 새벽에 하는 생각들',
  },
  {
    id: 4,
    src: 'https://picsum.photos/414/414?random=4',
    title: '일주일의 커피♨4',
    content: '하루 한 끼,나를 위한 테이블 기록',
    user: 'Aine님이 새벽에 하는 생각들',
  },
]);

const currentSlide = ref(slides.value[0]);

const onUpdateCurrentSlide = (e: any) => {
  currentSlide.value = slides.value[e.realIndex];
};
</script>

<template>
  <div class="container">
    <div class="top-wrapper"></div>

    <div class="bottom-wrapper">
      <swiper
        :rewind="true"
        :navigation="false"
        :modules="modules"
        :loop="true"
        :pagination="{
          clickable: false,
        }"
        :style="{
          '--swiper-pagination-color': '#999999',
          '--swiper-pagination-bullet-inactive-color': '#eee',
          '--swiper-pagination-bullet-inactive-opacity': '1',
          '--swiper-pagination-bullet-size': '5px',
          '--swiper-pagination-bullet-horizontal-gap': '5px',
        }"
        @slide-change="(e) => onUpdateCurrentSlide(e)"
        class="mySwiper"
      >
        <div class="label">에디터's Pick</div>

        <swiper-slide v-for="slide in slides" :key="slide.id">
          <div class="image-wrap">
            <img :src="slide.src" />
          </div>
        </swiper-slide>
      </swiper>

      <div class="text-wrap">
        <h3 class="title">{{ currentSlide.title }}</h3>
        <p class="content">{{ currentSlide.content }}</p>

        <div class="user-content">
          <img
            class="user-logo"
            src="https://picsum.photos/200?random=1"
            alt=""
          />
          <p class="user-text">{{ currentSlide.user }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@media screen and (max-width: 480px) {
  .bottom-wrapper {
    min-height: 430px !important;
  }

  .swiper {
    top: 190px !important;
    height: 350px !important;
    max-width: 21rem !important;
  }

  .label {
    top: 10px !important;
    left: 15px !important;
  }

  .text-wrap {
    padding: 1rem !important;
  }
}
.container {
  position: relative;
  color: $white-color;
}

.top-wrapper {
  height: 50px;
  background-color: $white-color;
}
.bottom-wrapper {
  display: flex;
  align-items: end;
  min-height: 520px;
  background-color: $black-color;
  cursor: pointer;
}

.swiper {
  position: absolute;
  top: 240px;
  left: 50%;
  right: 50%;
  transform: translate(-50%, -50%);
  max-width: 40rem;
  width: 100%;
  height: 433px;
  margin: 0 auto;

  .image-wrap {
    position: relative;
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.label {
  position: absolute;
  z-index: 10;
  top: 15px;
  left: 10px;
  background-color: $orange-color;
  padding: 5px 8px;
  border-radius: 2.5px;
  font-size: 0.6rem;
  font-weight: bold;
}

.text-wrap {
  width: 40rem;
  margin: 0 auto;
  padding: 1rem 0rem;

  .title {
    font-weight: 600;
  }

  .content {
    font-size: 0.8rem;
  }
  .user-content {
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 5px;
    .user-logo {
      width: 25px;
      height: 25px;
      border: 2px solid #eee;
      border-radius: 50%;
    }

    .user-text {
      color: #e2e2e2;
      font-size: 0.75rem;
    }
  }
}
</style>
