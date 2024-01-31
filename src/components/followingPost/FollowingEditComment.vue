<script setup lang="ts">
import { defineProps, onMounted, ref, watch } from 'vue';

const props = defineProps({
  editLoading: Boolean,
  user: Object,
  commentIndex: Number,
  content: String,
  postId: String,
  onEditSubmit: Function,
});

const inputRef = ref();
const commentEditValue = ref(props?.content);

const onEdit = () => {
  if (props?.content === commentEditValue.value || props?.editLoading) {
    return;
  }
  if (commentEditValue.value === '') {
    return alert('댓글을 입력해주세요.');
  }

  if (props.onEditSubmit) {
    const data = {
      userId: props?.user?.uid,
      content: commentEditValue.value,
      updateDated: new Date()?.toLocaleDateString('ko', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    };

    props.onEditSubmit(props.commentIndex, props.postId, data);
  }
};

watch(
  () => props?.editLoading,
  (newVal) => {
    console.log(newVal);
  }
);

onMounted(() => {
  inputRef.value.focus();
});
</script>

<template>
  <div class="input-wrap">
    <input type="text" v-model="commentEditValue" ref="inputRef" />

    <button
      @click="onEdit"
      :class="{ isActive: props.content === commentEditValue ? true : false }"
    >
      {{ !editLoading ? '수정' : '수정중..' }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.input-wrap {
  display: flex;
  width: 100%;
  padding: 1rem 0rem;

  input {
    width: 100%;
    padding: 0.5rem 0.7rem;
    background-color: #ffffff;
    color: $black-color;
    outline: none;
    border: 1px solid #eee;
    border-right: none;
    border-radius: 2px;
  }
  button {
    flex-shrink: 0;
    background-color: white;
    padding: 0.5rem;
    border: 1px solid #eeeeee;
    transition: all 0.1s ease-in-out;
  }

  .isActive {
    background-color: #eee;
    cursor: default;
  }
}
</style>
