<script setup lang="ts">
import { ref, onMounted } from 'vue';
import router from '@/router';
import { Images } from '@/types/images.d.ts';
import { v4 as uuidv4 } from 'uuid';
import { app, db } from '@/firebaseApp';
import {
  ref as storageRef,
  getStorage,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { useStore } from 'vuex';
import { incrementPostCount } from '@/api/post';
import { addUserPostCount } from '@/api/user';

import FileForm from './File-form.vue';
import PostForm from './Post-form.vue';
import TagInput from './TagInput.vue';

const store = useStore();
const storage = getStorage(app);

const user = ref(store.getters['userStore/getUser']);

const imagesFile = ref<Images[]>([]);
const uploadedImageFileName = ref<{ src: string }[]>([]);

const formData = ref({
  title: localStorage.getItem('title') || '',
  content: localStorage.getItem('content') || '',
});

const tags = ref<string[]>(JSON.parse(localStorage.getItem('tags') || '[]'));

const isShowFileEdit = ref(false);
const isLoading = ref(false);

// Fire-form.vue에서 onCropImage를 누르면 발동됨
// 이미지의 blob객체를 담고있음
const onImagesUpload = (images: any) => {
  const copyArrayData = [...imagesFile.value];
  copyArrayData.push(images);

  imagesFile.value = copyArrayData;
};

const onFormDataUpdate = ({ title, content }: any) => {
  // 제목 입력
  if (title) {
    formData.value = { ...formData.value, title: title };
  } else {
    // 내용 입력
    formData.value = { ...formData.value, content: content };
  }
};

const onAddTag = (tag: string) => {
  const dataArray = [...tags.value, tag];
  localStorage.setItem('tags', JSON.stringify(dataArray));
  tags.value = dataArray;
};

const onRemoveTag = (index: number) => {
  if (index !== undefined && index !== null) {
    tags.value.splice(index, 1);

    localStorage.setItem('tags', JSON.stringify(tags.value));
  }
};

const onToggleIsShowFileEdit = () => {
  isShowFileEdit.value = !isShowFileEdit.value;
};

// 이미지 업로드함수
const handelUploadImages = async () => {
  for (let i = 0; i < imagesFile.value.length; i++) {
    const image = imagesFile.value[i];
    try {
      const fileName = uuidv4();
      await uploadBytes(
        storageRef(storage, 'images/' + fileName),
        image.src as any
      );
      // 성공적으로 업로드된 경우 실행할 코드
      const imgAddress = await getDownloadURL(
        storageRef(storage, `images/${fileName}`)
      );

      const arrayData = [...uploadedImageFileName.value];
      arrayData.push({ src: imgAddress });
      uploadedImageFileName.value = arrayData;
    } catch (error) {
      // 업로드 중 오류가 발생한 경우 실행할 코드
      console.error(`Error uploading image ${i + 1}:`, error);
    }
  }
};

const onSubmit = async () => {
  if (isLoading.value) return;

  if (imagesFile.value.length === 0) {
    return alert('이미지를 하나 이상 업로드해주세요! ');
  } else if (
    formData.value.title.length < 2 ||
    formData.value.title.length > 13
  ) {
    return alert('제목은 2글자~13글자 이내로 작성해주세요');
  } else if (
    formData.value.content.length < 2 ||
    formData.value.content.length > 1500
  ) {
    return alert('내용은 2자~1500자 이내로 작성해주세요');
  } else if (!tags.value || tags.value.length === 0) {
    return alert('태그를 하나 이상 입력해주세요');
  }

  isLoading.value = true;

  await handelUploadImages();

  try {
    if (uploadedImageFileName.value) {
      const tagsWithoutHash = tags.value.map((tag) => tag.substring(1));

      await addDoc(collection(db, 'posts'), {
        title: formData.value.title,
        content: formData.value.content,
        tags: tagsWithoutHash,
        imageUrl: uploadedImageFileName.value,
        like: [],
        comment: [],
        createdAt: new Date()?.toLocaleDateString('ko', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        uid: user?.value.uid,
      });

      // 유저가 작성한 postCount갯수 증가
      await addUserPostCount(user?.value?.uid);
      // 포스트 전체 갯수 증가
      await incrementPostCount();

      alert('게시글 업로드를 완료했습니다.');
      isLoading.value = false;

      localStorage.removeItem('title'),
        localStorage.removeItem('content'),
        localStorage.removeItem('tags'),
        router.push('/');
    }
  } catch (error) {
    // 게시글 업로드중 오류가 발생했을 경우,
    console.error(`Error 게시글 업로드:`, error);

    alert('게시글 업로드중 에러가 발생했습니다.');
  }
};

onMounted(() => {
  if (!user.value) return alert('로그인이 필요합니다.');
});
</script>

<template>
  <header class="create-post-header">
    <font-awesome-icon
      :icon="['fas', 'xmark']"
      class="pointer"
      style="font-size: 1.2rem"
      @click="router.go(-1)"
    />
    기록하기

    <div
      v-if="!isShowFileEdit"
      @click="onSubmit"
      :class="{
        complete:
          formData.title &&
          formData.content &&
          tags.length !== 0 &&
          imagesFile.length !== 0,
      }"
    >
      {{ isLoading ? 'loading...' : '완료' }}
    </div>
  </header>

  <FileForm
    :onToggleIsShowFileEdit="onToggleIsShowFileEdit"
    :isShowFileEdit="isShowFileEdit"
    :onImagesUpload="onImagesUpload"
  />
  <PostForm
    :isShowFileEdit="isShowFileEdit"
    :title="formData.title"
    :content="formData.content"
    :onFormDataUpdate="onFormDataUpdate"
    v-if="!isShowFileEdit"
  />

  <div class="section" v-if="!isShowFileEdit">
    <p class="subTitle">태그</p>
    <TagInput :tags="tags" :onAddTag="onAddTag" :onRemoveTag="onRemoveTag" />
  </div>
</template>

<style lang="scss" scoped>
.create-post-header {
  display: flex;
  align-items: center;
  gap: 20px;
  font-weight: bold;
  border-bottom: 0;

  div {
    margin-left: auto;
    color: gray;
  }

  .complete {
    cursor: pointer;
    color: $black-color;
    font-weight: bold;
  }
}
.section {
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
}
.subTitle {
  font-weight: bold;
  font-size: 1rem;
  padding-bottom: 0.5rem;
}
</style>
