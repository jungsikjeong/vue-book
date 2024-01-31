<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue';
import { useStore } from 'vuex';
import {
  postComment,
  fetchComment,
  editComment,
  deleteComment,
} from '../../api/comment';
import { onUserRouterMove } from '@/assets/routerMove';

import EditComment from './EditComment.vue';

const store = useStore();

const props = defineProps(['postItem', 'onLikeClick']);

const user = ref(store.getters['userStore/getUser']);

const commentValue = ref('');
const commentList = ref();
const editLoading = ref(false);

const onPostLikeClick = () => {
  props.onLikeClick(props?.postItem?.id, user?.value?.uid);
};

// 댓글 삭제버튼
const onCommentRemove = async (commentIndex: number, postId: string) => {
  const isConfirmed = window.confirm('댓글을 삭제하시겠습니까?');

  if (isConfirmed) {
    try {
      const result = await deleteComment(commentIndex, postId);
      if (result?.state === '200') {
        const data = await fetchComment(props.postItem.id);
        let dataList: any = [];

        data?.map((item: any) => {
          dataList = [...dataList, { ...item, isEditMode: false }];
        });
        commentList.value = dataList;
      }
    } catch (error) {
      console.error('댓글 삭제 중 오류 발생:', error);
    }
  }
};

// 수정 버튼을 누를 때 해당 댓글의 isEditMode를 토글
const enterEditMode = (commentItem: any) => {
  commentItem.isEditMode = !commentItem.isEditMode;
};

// 댓글 수정 전송
const onEditSubmit = async (
  commentIndex: number,
  postId: string,
  data: any
) => {
  const result = await editComment(commentIndex, postId, data);

  if (result?.state === '200') {
    editLoading.value = true;
    const data = await fetchComment(props.postItem.id);
    let dataList: any = [];

    data?.map((item: any) => {
      dataList = [...dataList, { ...item, isEditMode: false }];
    });
    commentList.value = dataList;
    editLoading.value = false;
  }
};

const onSubmit = async () => {
  if (commentValue.value.length === 0 || commentValue.value == '') {
    return alert('댓글을 입력해주세요.');
  }

  const data = {
    userId: user?.value.uid,
    content: commentValue.value,
    updateDated: new Date()?.toLocaleDateString('ko', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
  };

  await postComment(data, props?.postItem?.id);
  commentList.value = await fetchComment(props.postItem.id);
  commentValue.value = '';
};

onMounted(async () => {
  const data = await fetchComment(props?.postItem.id);
  let dataList: any = [];

  data?.map((item: any) => {
    dataList = [...dataList, { ...item, isEditMode: false }];
  });

  commentList.value = dataList;
});
</script>

<template>
  <div class="comment-wrap">
    <div class="icon-wrap">
      <font-awesome-icon
        icon="heart"
        @click="onPostLikeClick"
        class="pointer"
      /><span class="count"> {{ postItem?.like?.length }} </span>

      <font-awesome-icon icon="comment" />
      <span class="count">
        {{ commentList?.length ? commentList?.length : 0 }}
      </span>
    </div>

    <div class="input-wrap" v-if="user">
      <input
        type="text"
        placeholder="댓글 달기"
        v-model="commentValue"
        @keyup.enter="onSubmit"
      />
      <button @click="onSubmit">입력</button>
    </div>

    <div
      class="user-wrap"
      v-for="(commentItem, index) in commentList"
      :key="commentItem?.user?.userId"
    >
      <div
        class="user-wrap-img__wrap pointer"
        @click="onUserRouterMove(props.postItem?.uid, user)"
      >
        <img :src="commentItem?.user?.photoURL" alt="" />
      </div>

      <div class="user-wrap-name__wrap">
        <p
          class="user-wrap-name__wrap-username pointer"
          @click="onUserRouterMove(commentItem?.user?.uid, user)"
        >
          {{ commentItem?.user?.displayName }}
        </p>
        <p>{{ commentItem?.comment?.updateDated?.slice(0, 11) }}</p>
        <p v-if="user?.uid === commentItem?.user?.uid" class="pointer">
          <span
            v-if="!commentItem.isEditMode"
            @click="enterEditMode(commentItem)"
            >수정</span
          >
          <span v-else @click="enterEditMode(commentItem)">취소</span>
          <span @click="onCommentRemove(index, postItem?.id)"> 삭제</span>
        </p>
      </div>

      <div class="content">
        <template v-if="!commentItem.isEditMode">
          {{ commentItem?.comment?.content }}
        </template>

        <EditComment
          :editLoading="editLoading"
          :user="user"
          :commentIndex="index"
          :postId="props?.postItem?.id"
          :onEditSubmit="onEditSubmit"
          :content="commentItem?.comment?.content"
          v-if="commentItem.isEditMode"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.comment-wrap {
  @media screen and (max-width: 480px) {
    padding: 1rem 0.2rem 0rem;
  }
  padding: 1.5rem 1.5rem 0rem;
}

.input-wrap {
  display: flex;
  width: 100%;
  padding: 1rem 0rem;

  input {
    width: 100%;
    padding: 0.5rem 0.7rem;
    background-color: #eeeeee;
    color: $black-color;
    outline: none;
    border: 0;
    border-radius: 2px;
  }
  button {
    flex-shrink: 0;
    background-color: white;
    padding: 0.5rem;
    border: 1px solid #eeeeee;
  }
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
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;

  .user-wrap-img__wrap {
    position: relative;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;

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
    flex-shrink: 0;
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
