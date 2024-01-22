<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  title: String,
  icon: String,
  disabled: Boolean,
  onBtnClick: Function,
});
</script>

<template>
  <button class="button-style" @click="props.onBtnClick" :class="{ disabled }">
    {{ props.title }}
    <span v-if="props.icon" class="icon">{{ props.icon }} </span>
  </button>
</template>

<style lang="scss" scoped>
.button-style {
  font-size: 0.765rem;
  font-weight: bold;
  width: 100%;
  padding: 0.3rem 0;
  border: 1px solid #eee;
  border-radius: 5px;
  color: $black-color;
}

.disabled {
  cursor: inherit;
  opacity: 0.5;
}
</style>
