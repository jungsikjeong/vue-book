<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, defineProps } from 'vue';

const props = defineProps({
  tags: {
    type: Array,
    required: true,
  },
  onAddTag: Function,
  onRemoveTag: Function,
});
const newTag = ref('');

const onAddTag = () => {
  if (newTag.value.trim() !== '' && !props.tags.includes(newTag.value)) {
    props.onAddTag && props.onAddTag(newTag.value);

    newTag.value = '#';
  }
};

const onChangeInput = (e: any) => {
  if (e.target.value === '') {
    newTag.value = '#';
  }
};

const onTagFocus = () => {
  if (newTag.value === '') {
    newTag.value = '#';
  }
};

const onClickOutside = (event: any) => {
  if (!event.target.closest('.tag-area')) {
    newTag.value = '';
  }
};

onMounted(() => {
  document.addEventListener('click', onClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside);
});
</script>

<template>
  <div class="tag-area">
    <ul>
      <li
        class="tag"
        v-for="(tag, index) in tags"
        :key="index"
        @click="props.onRemoveTag && props.onRemoveTag(index)"
        :data-index="index"
      >
        {{ tag }}<button class="cross">X</button>
      </li>
      <input
        type="text"
        class="tag-input"
        id="tag-input"
        v-model="newTag"
        @input="onChangeInput($event)"
        @keyup.enter="onAddTag"
        @keyup.delete="props.onRemoveTag && props.onRemoveTag()"
        @focus="onTagFocus"
        :placeholder="`#태그입력`"
      />
    </ul>
  </div>
</template>

<style scoped lang="scss">
.tag-area {
  position: relative;
  outline: none;
  cursor: text;
  display: flex;
  align-items: center;
  transition: all 0.2s;
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid $cloudy-gray;
  font-size: 0.7rem;
}

.tag-area ul {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.active {
  border: 2px solid #8d29ff !important;
}

.tag {
  border-radius: 15px;
  border: 1px solid $cloudy-gray;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.2rem;
  padding: 0.3rem;
  font-size: 0.765rem;
  cursor: pointer;
}

.tag-input {
  outline: none;
  border: none;
  width: 150px;
  margin-left: 0.5rem;
  background: transparent;
  font-size: 0.75rem;
  &::placeholder {
    font-size: 0.875rem;
  }
}
.cross {
  cursor: pointer;
  color: $cloudy-gray;
  margin-left: 0.5rem;
}
</style>
