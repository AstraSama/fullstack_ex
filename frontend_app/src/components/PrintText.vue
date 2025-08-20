<script setup lang="ts">
// defineProps tipado: a prop "text" é obrigatória e string
defineProps<{ text: string }>()
</script>

<template>
  <p>{{ text }}</p>
</template>
