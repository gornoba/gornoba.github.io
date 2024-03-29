<script setup lang="ts">
defineProps({
  href: String,
  text: String,
});
</script>

<template>
  <p style="margin: -16px 0 !important">
    <slot name="header"></slot>
    <a :href="href" target="_blank">{{ text }}</a>
    <slot></slot>
  </p>
</template>
