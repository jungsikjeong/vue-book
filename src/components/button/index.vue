<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({ title: String, icon: String });
</script>

<template>
  <button class="button-style">
    {{ props.title }}
    <span v-if="props.icon" class="icon">{{ props.icon }} </span>
  </button>
</template>

<style lang="scss" scoped>
.button-style {
  font-size: 0.765rem;
  width: 100%;
  padding: 0.3rem 0;
  border: 1px solid #eee;
  border-radius: 5px;
  color: $black-color;
}
</style>
