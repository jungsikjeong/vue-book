<script setup lang="ts"></script>

<template>
  <div class="comment-wrap">
    <div class="icon-wrap">
      <font-awesome-icon icon="heart" /><span class="count"> 1 </span>

      <font-awesome-icon icon="comment" /> <span class="count"> 10 </span>
    </div>

    <div class="user-wrap">
      <div class="user-wrap-img__wrap">
        <img
          src="https://i.ytimg.com/vi/lmU6q4JaBfE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBc_WWWRwdU4Lw_fhpmdjVYWB6emw"
          alt=""
        />
      </div>

      <div class="user-wrap-name__wrap">
        <p class="user-wrap-name__wrap-username">딩굴</p>
        <p>1주 전</p>
      </div>
    </div>

    <div class="content">
      와 스쿼트 백개는 진짜 대단한데요? 하루에 나눠서 백개라도 해볼까요 진짜.
      운동 모있냐 숨쉬듯하는거지 와 스쿼트 백개는 진짜 대단한데요? 하루에 나눠서
      와 스쿼트 백개는 진짜 대단한데요? 하루에 나눠서 백개라도 해볼까요 진짜.
      운동 모있냐 숨쉬듯하는거지 와 스쿼트 백개는 진짜 대단한데요? 하루에 나눠서
      와 스쿼트 백개는 진짜 대단한데요? 하루에 나눠서 백개라도 해볼까요 진짜.
      운동 모있냐 숨쉬듯하는거지 와 스쿼트 백개는 진짜 대단한데요? 하루에 나눠서
      와 스쿼트 백개는 진짜 대단한데요? 하루에 나눠서 백개라도 해볼까요 진짜.
      운동 모있냐 숨쉬듯하는거지 와 스쿼트 백개는 진짜 대단한데요? 하루에 나눠서
      와 스쿼트 백개는 진짜 대단한데요? 하루에 나눠서 백개라도 해볼까요 진짜.
      운동 모있냐 숨쉬듯하는거지 와 스쿼트 백개는 진짜 대단한데요? 하루에 나눠서
      와 스쿼트 백개는 진짜 대단한데요? 하루에 나눠서 백개라도 해볼까요 진짜.
      운동 모있냐 숨쉬듯하는거지 와 스쿼트 백개는 진짜 대단한데요? 하루에 나눠서
    </div>
  </div>
</template>

<style scoped lang="scss">
.comment-wrap {
  padding: 1.5rem 1.5rem 0rem;
}

.icon-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  color: $cloudy-black-color;

  .count {
    font-size: 0.875rem;
  }
}

.user-wrap {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 10px;
  .user-wrap-img__wrap {
    position: relative;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    overflow: hidden;

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .user-wrap-name__wrap {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    height: 1.75rem;
    p {
      color: #666;
      font-size: 0.8rem;
    }
    .user-wrap-name__wrap-username {
      display: inline-block;
      max-width: 7.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.content {
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: $black-color;
  width: 100%;
}
</style>
