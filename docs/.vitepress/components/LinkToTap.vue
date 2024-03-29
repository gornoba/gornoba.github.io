<script setup>
defineProps({
  href: String,
  text: String,
});
</script>

<template>
  <p style="margin-bottom: -16px !important; margin-top: -16px !important">
    <slot name="header"></slot>
    <a :href="href" target="_blank">{{ text }}</a>
    <slot></slot>
  </p>
</template>
