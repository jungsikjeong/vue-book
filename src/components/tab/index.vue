<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  names: Array,
  currentTapName: String,
  onTapChange: Function,
});
</script>

<template>
  <header class="taps-wrap">
    <ul class="taps">
      <li
        v-for="(name, index) in props.names"
        :key="index"
        :class="{ active: props.currentTapName === name }"
        class="tap"
        @click="props.onTapChange && props.onTapChange(name)"
      >
        {{ name }}
      </li>
    </ul>
  </header>
</template>

<style lang="scss" scoped>
.taps-wrap {
  border-bottom: 1px solid #eee;
}
.taps {
  position: relative;
  display: flex;
  padding: 0 1rem;
  width: 100%;
  font-size: 0.875rem;

  .tap {
    padding: 0 0.5rem;
    padding-bottom: 0.2rem;
    cursor: pointer;
  }

  .active {
    font-weight: 600;
    padding-bottom: 0.2rem;
    border-bottom: 2px solid black;
  }
}
</style>
