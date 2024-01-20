<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const props = defineProps({
  onToggleIsShowFileEdit: Function,
  formData: Object,
  onFormDataUpdate: Function,
});

const onContentUpdate = (newContent: any) => {
  props.onFormDataUpdate &&
    props.onFormDataUpdate({ content: newContent.ops[0] });
};

const editorOptions = ref({
  modules: {
    toolbar: false,
  },
  placeholder: '기록할 내용을 입력해주세요. (1,500자 이내)',
});
</script>

<template>
  <form @submit.prevent>
    <div class="section">
      <p class="subTitle">제목</p>
      <input
        type="text"
        @input="onFormDataUpdate && onFormDataUpdate({ title: $event })"
      />
    </div>

    <div class="section">
      <QuillEditor
        class="post-content"
        theme=""
        toolbar=""
        :options="editorOptions"
        @update:content="onContentUpdate"
      >
      </QuillEditor>
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
