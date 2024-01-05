<script setup lang="ts">
import { defineProps } from 'vue';
import PostItem from './post-item/index.vue';
import Button from '../button/index.vue';

const postList = [
  {
    id: 0,
    title: '[나 탐구일지]',
    date: '1월 5일 금요일',
    content:
      '외면을 가꾸기 보다, 이제는 내면의 아름다움을 추구하는 사람이 되고싶다.',
    images: ['https://picsum.photos/414/414?random=1'],
    tags: ['나탐구일지,디저트,기분전환'],
  },
  {
    id: 1,
    title: '[나 탐구일지]',
    date: '1월 5일 금요일',
    content:
      '외면을 가꾸기 보다, 이제는 내면의 아름다움을 추구하는 사람이 되고싶다.',
    images: ['https://picsum.photos/414/414?random=2'],
    tags: ['나탐구일지,디저트,기분전환'],
  },
  {
    id: 2,
    title: '[나 탐구일지]',
    date: '1월 5일 금요일',
    content:
      '외면을 가꾸기 보다, 이제는 내면의 아름다움을 추구하는 사람이 되고싶다.',
    images: ['https://picsum.photos/414/414?random=3'],
    tags: ['나탐구일지,디저트,기분전환'],
  },
  {
    id: 3,
    title: '[나 탐구일지]',
    date: '1월 5일 금요일',
    content:
      '외면을 가꾸기 보다, 이제는 내면의 아름다움을 추구하는 사람이 되고싶다.',
    images: ['https://picsum.photos/414/414?random=4'],
    tags: ['나탐구일지,디저트,기분전환'],
  },
  {
    id: 4,
    title: '[나 탐구일지]',
    date: '1월 5일 금요일',
    content:
      '외면을 가꾸기 보다, 이제는 내면의 아름다움을 추구하는 사람이 되고싶다.',
    images: ['https://picsum.photos/414/414?random=5'],
    tags: ['나탐구일지,디저트,기분전환'],
  },
  {
    id: 5,
    title: '[나 탐구일지]',
    date: '1월 5일 금요일',
    content:
      '외면을 가꾸기 보다, 이제는 내면의 아름다움을 추구하는 사람이 되고싶다.',
    images: ['https://picsum.photos/414/414?random=6'],
    tags: ['나탐구일지,디저트,기분전환'],
  },
];

const sectionTitle = defineProps({ title: String });
</script>

<template>
  <div class="container">
    <h4 class="section-title">{{ sectionTitle.title }}</h4>

    <ul class="post-list">
      <PostItem
        :postItem="postItem"
        v-for="postItem in postList"
        :key="postItem.id"
      />
      <Button :title="`더보기`" :icon="`▼`"> </Button>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 1rem;
}
.section-title {
  font-weight: bold;
  margin-bottom: 1rem;
}
.post-list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
