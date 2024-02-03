<script setup lang="ts">
import { ref, reactive, onUnmounted, defineProps, PropType } from 'vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import { Images } from '../../types/images.d.ts';

const props = defineProps({
  onToggleIsShowFileEdit: Function,
  isShowFileEdit: Boolean,
  onImagesUpload: Function,
  imagesFile: Array as PropType<Images[]>,
  onClickRemoveImage: Function,
});

const images = ref<Images[]>(
  props.imagesFile && props?.imagesFile?.length !== 0 ? props.imagesFile : []
);

const image = reactive({
  src: '',
  type: 'image/jpg',
});

const cropper = ref();
const file = ref();
const loading = ref(false);

// 다음버튼을 누르면 이미지가 저장이됨
const onCropImage = async () => {
  loading.value = true;
  if (cropper.value) {
    const { canvas } = cropper.value.getResult();
    const dataURL = canvas.toDataURL(image.type);

    images.value = [...images.value, { src: dataURL, type: image.type }];

    const blob = await fetch(dataURL).then((response) => response.blob());

    const imageSubmit = { src: blob, type: image.type };

    props.onImagesUpload && props.onImagesUpload(imageSubmit);
    props.onToggleIsShowFileEdit && props.onToggleIsShowFileEdit();
    console.log(images);
  }

  loading.value = false;
};

const onUploadImage = (event: any) => {
  if (images.value.length === 4) {
    return alert('이미지는 네개까지만 허용이됩니다.');
  }
  const { files } = event.target;

  if (files && files[0]) {
    if (image.src) {
      URL.revokeObjectURL(image.src);
    }
    const blob = URL.createObjectURL(files[0]);
    image.src = blob;
    image.type = files[0].type;

    props.onToggleIsShowFileEdit && props.onToggleIsShowFileEdit();
  }
};

const onRemoveImage = (clickIndex: number) => {
  const dataArray = [...images.value];
  dataArray.splice(clickIndex, 1);
  images.value = dataArray;
  props.onClickRemoveImage && props.onClickRemoveImage(clickIndex);
};

onUnmounted(() => {
  if (image.src) {
    URL.revokeObjectURL(image.src);
  }
});
</script>

<template>
  <header class="file-wrap-header" v-if="props.isShowFileEdit">
    <div v-if="loading">loading..</div>
    <div v-else @click="onCropImage" class="pointer">다음</div>
  </header>

  <div class="file-wrap">
    <label for="post-image" class="input-file-wrap pointer">
      <div>
        <font-awesome-icon :icon="['fas', 'camera-retro']" />
        <p>{{ images.length }}/4</p>
      </div>
    </label>
    <input
      type="file"
      id="post-image"
      name="post-image"
      accept="image/*"
      class="input-file"
      @change="onUploadImage($event)"
      ref="file"
    />

    <div class="file-item" v-for="(image, index) in images" :key="index">
      <img :src="image.src" v-if="image.src" />
      <div class="close-btn pointer" @click="onRemoveImage(index)">X</div>
    </div>
  </div>

  <div class="image-edit-wrap" v-if="props.isShowFileEdit">
    <Cropper ref="cropper" class="cropper" :src="image.src" />
  </div>
</template>

<style lang="scss" scoped>
.file-wrap-header {
  position: absolute;
  top: 15px;
  right: 20px;
  font-weight: bold;
  border-bottom: 1px solid $black-color;
}
.cropper {
  max-height: 500px;
}
.file-wrap {
  max-width: 40rem;
  display: flex;
  align-items: center;
  gap: 10px;
  overflow-x: scroll;
  padding: 0 1rem;
  padding-left: 0;
}

.file-item {
  flex-shrink: 0;
  position: relative;
  width: 150px;
  height: 150px;

  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    text-align: center;
    font-size: 12px;
    color: $black-color;
    font-weight: bold;
    background-color: #eee;
  }
}

.input-file-wrap {
  display: inline-block;
  width: 150px;

  div {
    margin: 1rem 0rem;
    position: relative;
    background-color: #eee;
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 0.1rem;
    color: $black-color;

    p {
      font-size: 12px;
    }
  }
}

.input-file {
  display: none;
}

.image-edit-wrap {
  padding-top: 1rem;
}

img {
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
}
</style>
