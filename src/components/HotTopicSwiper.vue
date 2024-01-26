<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/navigation';
import { fetchHotTopic } from '@/api/hotTopic';

const modules = ref([Navigation, Pagination]);

const hotTopicList = ref();
const currentSlide = ref();

const onUpdateCurrentSlide = (e: any) => {
  if (hotTopicList.value) {
    currentSlide.value = hotTopicList.value[e?.realIndex];
  }
};
onMounted(async () => {
  hotTopicList.value = await fetchHotTopic();
});
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

        <swiper-slide
          v-for="hotTopicItem in hotTopicList"
          :key="hotTopicItem.id"
        >
          <router-link :to="'/' + hotTopicItem.id + '/post'">
            <div class="image-wrap">
              <img :src="hotTopicItem.imageUrl[0].src" />
            </div>
          </router-link>
          {{ hotTopicItem.imageUrl }}
        </swiper-slide>
      </swiper>

      <div class="text-wrap">
        <router-link :to="'/' + currentSlide?.id + '/post'">
          <h3 class="title">{{ currentSlide?.title }}</h3>
          <p class="content">{{ currentSlide?.content?.insert }}</p>
        </router-link>

        <div class="user-content">
          <img
            class="user-logo"
            :src="
              currentSlide && currentSlide.user && currentSlide.user[0].photoURL
            "
            alt=""
          />
          <p class="user-text">
            {{
              currentSlide &&
              currentSlide.user &&
              currentSlide.user[0].displayName
            }}
          </p>
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
    max-height: 20px;
    word-break: break-word;
    white-space: pre-line;
    overflow: hidden;
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
