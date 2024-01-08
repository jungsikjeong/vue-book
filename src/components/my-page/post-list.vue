<script setup lang="ts"></script>

<template>
  <div class="wrapper">
    <div class="box post-add-btn">
      <font-awesome-icon :icon="['fas', 'plus']" />
      <p>보드 추가</p>
    </div>
    <div class="box-wrap">
      <div class="box">
        <img
          src="https://image.xportsnews.com/contents/images/upload/article/2023/0508/mb_1683545685756632.jpg"
          alt=""
        />
      </div>

      <h4 class="post-title">닝닝</h4>
    </div>

    <div class="box-wrap">
      <div class="box">
        <img
          src="https://image.xportsnews.com/contents/images/upload/article/2023/0508/mb_1683545685756632.jpg"
          alt=""
        />
      </div>
      <h4 class="post-title">닝닝</h4>
    </div>

    <div class="box-wrap">
      <div class="box">
        <img
          src="https://image.xportsnews.com/contents/images/upload/article/2023/0508/mb_1683545685756632.jpg"
          alt=""
        />
      </div>

      <h4 class="post-title">닝닝</h4>
    </div>
    <div class="box-wrap">
      <div class="box">
        <img
          src="https://image.xportsnews.com/contents/images/upload/article/2023/0508/mb_1683545685756632.jpg"
          alt=""
        />
      </div>

      <h4 class="post-title">닝닝</h4>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  margin-top: 1rem;
  margin-bottom: 3.5rem;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: min-content;
  gap: 0.5rem;
}

.box-wrap {
  @media screen and (min-width: 480px) {
    margin-bottom: 1rem;
  }
}

.box {
  @media screen and (min-width: 480px) {
    width: 100%;
    height: 450px;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  color: $cloudy-gray;
  width: 100%;
  height: 240px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    font-size: 0.7rem;
  }
}

.post-add-btn {
  @media screen and (min-width: 480px) {
    height: 450px;
  }

  border: 1px dashed #eee;
}

.post-title {
  font-weight: bold;
}
</style>
