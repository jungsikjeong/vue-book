<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const props = defineProps({
  onToggleIsShowFileEdit: Function,
  title: String,
  content: String,
  onFormDataUpdate: Function,
});
const quill = ref<any>(null);

const onContentUpdate = () => {
  if (quill.value) {
    const newContent = quill.value.getHTML();
    props.onFormDataUpdate && props.onFormDataUpdate({ content: newContent });
    localStorage.setItem('content', newContent);
  }
};

const onTitleUpdate = (e: any) => {
  const title = e.target.value;

  if (props.onFormDataUpdate) {
    if (title.length > 13) {
      e.target.value = title.slice(0, -1);
      return alert('제목은 13글자 이내로 작성해주세요');
    }
    localStorage.setItem('title', title);

    props.onFormDataUpdate({ title: e.target.value });
  }
};

const editorOptions = ref({
  modules: {
    toolbar: false,
  },
  placeholder: '기록할 내용을 입력해주세요. (1,500자 이내)',
});

onMounted(() => {
  if (quill.value) {
    quill.value.setHTML(localStorage.getItem('content') || '');
  }
});
</script>
<template>
  <form @submit.prevent>
    <div class="section">
      <p class="subTitle">제목</p>
      <input
        type="text"
        @input="onTitleUpdate && onTitleUpdate($event)"
        :value="title"
      />
    </div>

    <div class="section">
      <!-- <QuillEditor
        ref="quill"
        class="post-content"
        theme=""
        toolbar=""
        :options="editorOptions"
        @update:content="onContentUpdate"
      >
      </QuillEditor> -->

      <QuillEditor
        ref="quill"
        class="post-content"
        theme=""
        toolbar=""
        :options="editorOptions"
        @update:content="onContentUpdate"
      />
    </div>
  </form>
</template>

<style lang="scss" scoped>
.section {
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
}

input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid $cloudy-gray !important;
}
</style>
