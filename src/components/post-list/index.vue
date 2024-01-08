<script setup lang="ts">
import PostItem from './post-item/index.vue';
import Button from '../button/index.vue';
import SubTitle from '../sub-title/index.vue';

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
</script>

<template>
  <div class="container">
    <SubTitle :title="`최신 기록`"></SubTitle>

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
  max-width: 40rem;
  margin: 0 auto;
  margin-bottom: 3rem;
}

.post-list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
