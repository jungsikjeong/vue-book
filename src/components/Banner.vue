<script setup lang="ts">
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';

import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/navigation';

const modules = ref([Navigation]);

const slides = ref([
  {
    id: 1,
    src: 'https://picsum.photos/414/414?random=1',
  },
  {
    id: 2,
    src: 'https://picsum.photos/414/414?random=2',
  },
  {
    id: 3,
    src: 'https://picsum.photos/414/414?random=3',
  },
  {
    id: 4,
    src: 'https://picsum.photos/414/414?random=4',
  },
  {
    id: 5,
    src: 'https://picsum.photos/414/414?random=5',
  },
  {
    id: 6,
    src: 'https://picsum.photos/414/414?random=6',
  },
  {
    id: 7,
    src: 'https://picsum.photos/414/414?random=7',
  },
  {
    id: 8,
    src: 'https://picsum.photos/414/414?random=8',
  },
  {
    id: 9,
    src: 'https://picsum.photos/414/414?random=9',
  },
]);
</script>

<template>
  <div class="container">
    <swiper
      :rewind="true"
      :navigation="false"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="slide in slides" :key="slide.id">
        <div class="image-wrap">
          <img :src="slide.src" />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="scss" scoped>

.container{
  
}
</style>
