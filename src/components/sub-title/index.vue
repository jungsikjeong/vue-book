<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({ title: { String, required: true } });
</script>

<template>
  <h4 class="section-title">{{ props.title }}</h4>
</template>

<style scoped lang="scss">
.section-title {
  font-weight: bold;
  margin-bottom: 1rem;
}
</style>
