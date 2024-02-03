<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import router from '../../router';
import { useRoute } from 'vue-router';
import { Images } from '../../types/images.d.ts';
import { v4 as uuidv4 } from 'uuid';
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  getStorage,
} from 'firebase/storage';
import { app, db } from '@/firebaseApp';
import { useStore } from 'vuex';
import { fetchDetailPost } from '../../api/post';

import EditFileForm from './EditFile-form.vue';
import EditPostForm from './EditPost-form.vue';
import EditTagInput from './EditTagInput.vue';
import Loading from '../Loading.vue';
import { doc, updateDoc } from 'firebase/firestore';

const paramsId = useRoute()?.params?.id as string;

const store = useStore();
const storage = getStorage(app);

const user = ref(store.getters['userStore/getUser']);
const oldData = ref();

const imagesFile = ref<Images[]>([]);
const uploadedImageFileName = ref<{ src: string }[]>([]);

const formData = ref({
  title: localStorage.getItem('title') || '',
  content: localStorage.getItem('content') || '',
});
const tags = ref<string[]>(JSON.parse(localStorage.getItem('tags') || '[]'));

const isShowFileEdit = ref(false);
const isLoading = ref(false);
const isDataLoading = ref(false);

// 해당 이미지 삭제
const onClickRemoveImage = (index: number) => {
  const dataArray = [...imagesFile.value];
  dataArray.splice(index, 1);
  imagesFile.value = dataArray;
};

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

// 기존 이미지 지우기
const handleRemoveImages = async () => {
  try {
    for (const image of oldData?.value?.imageUrl) {
      let imageRef = storageRef(storage, image.src);

      await deleteObject(imageRef);
    }
  } catch (error) {
    console.error(error);
  }
};

// 이미지 업로드함수
const handleUploadImages = async () => {
  // 기존 이미지 지우기
  if (oldData?.value?.imageUrl !== 0) {
    await handleRemoveImages();
  }

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
  } else if (!tags.value) {
    return alert('태그를 하나 이상 입력해주세요');
  }

  isLoading.value = true;

  await handleUploadImages();

  try {
    if (uploadedImageFileName.value) {
      const postRef = doc(db, 'posts', paramsId);
      await updateDoc(postRef, {
        title: formData.value.title,
        content: formData.value.content,
        tags: tags.value,
        imageUrl: uploadedImageFileName.value,
        createdAt: new Date()?.toLocaleDateString('ko', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        uid: user?.value.uid,
      });

      alert('게시글 수정을 완료했습니다.');
      isLoading.value = false;

      localStorage.removeItem('title');
      localStorage.removeItem('content');
      localStorage.removeItem('tags');
      router.go(-1);
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
onMounted(async () => {
  isDataLoading.value = true;
  const data = await fetchDetailPost(paramsId);
  if (data) {
    oldData.value = data[0];
    localStorage.setItem('tags', JSON.stringify(data[0].tags));
    localStorage.setItem('title', data[0].title);
    localStorage.setItem('content', data[0].content);
    formData.value = { title: data[0].title, content: data[0].content };
    tags.value = data[0].tags;
    uploadedImageFileName.value = data[0].imageUrl;

    if (data[0].imageUrl.length !== 0) {
      imagesFile.value = data[0].imageUrl;
    }
  }

  isDataLoading.value = false;
});

onUnmounted(() => {
  localStorage.removeItem('tags');
  localStorage.removeItem('title');
  localStorage.removeItem('content');
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

  <Loading v-if="isDataLoading" />

  <EditFileForm
    :onToggleIsShowFileEdit="onToggleIsShowFileEdit"
    :isShowFileEdit="isShowFileEdit"
    :onImagesUpload="onImagesUpload"
    :onClickRemoveImage="onClickRemoveImage"
    :imagesFile="imagesFile"
    v-if="!isDataLoading"
  />
  <EditPostForm
    :isShowFileEdit="isShowFileEdit"
    :title="formData.title"
    :content="formData.content"
    :onFormDataUpdate="onFormDataUpdate"
    v-if="!isShowFileEdit && !isDataLoading"
  />

  <div class="section" v-if="!isShowFileEdit && !isDataLoading">
    <p class="subTitle">태그</p>
    <EditTagInput
      :tags="tags"
      :onAddTag="onAddTag"
      :onRemoveTag="onRemoveTag"
    />
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
