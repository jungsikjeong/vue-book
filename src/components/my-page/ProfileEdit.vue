<script setup lang="ts">
import { app, db } from '@/firebaseApp';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import {
  ref as storageRef,
  deleteObject,
  getStorage,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { defineProps, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const storage = getStorage(app);

const user = ref('') as any; // 유저 정보
const displayName = ref(''); // 유저 이름
const description = ref(''); // 유저 자기소개
const photoURL = ref<any>(''); // 유저 이미지
const imgAddress = ref(''); // 업로드 성공하고 반환된 유저 이미지 url

// 유저 이미지를 수정했을때 반환되는 Base64
const previewImage = ref<any>();
const file = ref<File | null>(null);

const props = defineProps({
  profileViewState: Boolean,
  onProfileView: Function,
});

// 이미지 blob객체로 변환
const onImageToBlob = async (event: any) => {
  const { files } = event.target;

  const reader = new FileReader();

  if (files && files[0]) {
    reader.readAsDataURL(files[0]);

    file.value = files[0];
    reader.onloadend = function () {
      // 이미지 미리보기
      previewImage.value = reader.result;
    };
  }
};

const handleUploadImages = async () => {
  try {
    // 이미지 바뀐게 없다면 아무것도 안함
    if (!file.value) {
      return { status: 200 };
    }

    // 이미지를 변경했다면,
    // 기존 이미지 지우기
    if (file.value && photoURL?.value) {
      let imageRef = storageRef(storage, photoURL.value as any);

      await deleteObject(imageRef);
    }

    const fileName = uuidv4() + '.user-img';
    await uploadBytes(storageRef(storage, 'images/' + fileName), file.value);

    imgAddress.value = await getDownloadURL(
      storageRef(storage, `images/${fileName}`)
    );

    return { status: 200 };
  } catch (error) {
    console.error(error);
  }
};

const onSubmit = async () => {
  if (displayName?.value.length > 13) {
    return alert('유저닉네임은 12글자이하로 지어주세요');
  }

  if (props?.onProfileView && user.value) {
    try {
      const result = await handleUploadImages();

      if (result?.status === 200) {
        const userRef = doc(db, 'users', user.value.uid);

        await updateDoc(userRef, {
          displayName: displayName.value.trim() || user.value.displayName,
          description: description.value || user.value.description || '',
          photoURL: imgAddress?.value ? imgAddress.value : photoURL.value,
        });
        alert('프로필 수정완료');

        props.onProfileView();
        await store.dispatch('userStore/initAuth');
      }
    } catch (error) {
      alert('요청에 실패했습니다..');
      console.log(error);
    }
  }
};
onMounted(async () => {
  const userInfo = store.getters['userStore/getUser'];

  if (userInfo) {
    const docRef = doc(db, 'users', userInfo.uid);
    const docSnap = await getDoc(docRef);
    user.value = docSnap.data();
    displayName.value = user.value.displayName;
    description.value = user.value.description;
    photoURL.value = user.value.photoURL;
  }
});
</script>

<template>
  <div class="header">
    <font-awesome-icon
      :icon="['fas', 'arrow-left']"
      class="pointer"
      @click="props.onProfileView"
    />
    프로필 수정

    <div class="save pointer" @click="onSubmit">저장</div>
  </div>

  <div class="user">
    <div class="user-image-wrap">
      <img :src="previewImage ? previewImage : photoURL" alt="" />

      <label for="avatar" class="input-file-text pointer">편집</label>
      <input
        type="file"
        id="avatar"
        name="avatar"
        accept="image/png, image/jpeg"
        class="input-file"
        @change="onImageToBlob($event)"
      />
    </div>

    <p class="user-login-info">카카오 간편 로그인 유저</p>
  </div>

  <form class="submit-form">
    <label for="nickname">닉네임<span class="require-icon">*</span></label>
    <input
      type="text"
      id="nickname"
      name="nickname"
      :placeholder="displayName"
      @input="(e:any)=>displayName=e.target&&e.target.value"
    />

    <label for="description">설명</label>
    <textarea
      id="description"
      name="description"
      :placeholder="description"
      @input="(e:any)=>description=e.target&&e.target.value"
    ></textarea>
  </form>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  gap: 20px;
  font-weight: bold;
  border-bottom: 0;
  letter-spacing: -1px;
}

.save {
  font-weight: bold;
  margin-left: auto;
}

.user {
  margin-top: 1rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.user-image-wrap {
  position: relative;
  overflow: hidden;
  width: 65px;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .input-file-text {
    position: absolute;
    bottom: 0px;
    width: 100%;
    font-size: 0.75rem;
    overflow: hidden;
    text-align: center;
    color: $white-color;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .input-file {
    display: none;
  }
}
.user-login-info {
  color: $cloudy-gray;
  letter-spacing: -1px;
  font-size: 0.675rem;
}

.submit-form {
  display: flex;
  flex-direction: column;
  gap: 5px;
  label {
    font-weight: bold;
  }

  .require-icon {
    color: tomato;
  }

  input,
  textArea {
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid $cloudy-gray;
  }
}
</style>
