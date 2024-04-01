<script setup lang="ts">
defineProps({
  num: Number,
  text: String,
});
</script>

<template>
  <span>
    <slot></slot>
  </span>
  <sup>
    <a :href="'#' + text">{{ num }}</a>
  </sup>
</template>
