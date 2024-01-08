<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  userName: { String, required: true },
  subTitle: String,
});
props;
</script>

<template>
  <div class="wrapper">
    <h4>{{ props.userName }}님의 {{ props.subTitle }} 비어있습니다.</h4>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  margin-top: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
</style>
