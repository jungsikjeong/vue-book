<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  profileViewState: Boolean,
  onProfileView: Function,
});

function onSubmit() {
  if (props?.onProfileView) {
    props.onProfileView();
  }
}
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
      <img
        src="https://post-phinf.pstatic.net/MjAyMjA3MjJfMTk2/MDAxNjU4NDcyMTk2NTcw.jZoVZZWQgyt0XMrxEMpHPVChhKRS9tOx-Cdwn2Jee68g.l-3xnhNzAuLwO4pa-0gZf5hs5zzfEtKuPtVHM29gcxog.JPEG/220721_%EC%97%90%EC%8A%A4%ED%8C%8C_%EC%B9%B4%EB%A6%AC%EB%82%98_3.jpg?type=w800_q75"
        alt=""
      />

      <label for="avatar" class="input-file-text pointer">편집</label>
      <input
        type="file"
        id="avatar"
        name="avatar"
        accept="image/png, image/jpeg"
        class="input-file"
      />
    </div>

    <p class="user-login-info">카카오 간편 로그인 유저</p>
  </div>

  <form class="submit-form" @click="onSubmit">
    <label for="nickname">닉네임<span class="require-icon">*</span></label>
    <input
      type="text"
      id="nickname"
      name="nickname"
      placeholder="센스있는오리139"
    />

    <label for="description">설명</label>
    <textarea id="description" name="description"></textarea>
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
