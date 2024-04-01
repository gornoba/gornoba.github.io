<script setup lang="ts">
defineProps({
  num: String,
  text: String,
  url: String,
});
</script>

<template>
  <div>
    <span :id="text">{{ text }}</span
    ><sup>{{ num }}</sup
    >: <slot></slot><a v-if="!!url" :href="url" target="_blank">{{ url }}</a>
  </div>
</template>
