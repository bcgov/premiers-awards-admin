<template>
  <div>
    <h1 v-if="props.header">{{props.header}}</h1>
    <h2 v-if="props.lead">{{props.lead}}</h2>
    <Divider />
  </div>
</template>

<script setup>
const props = defineProps(['header', 'lead']);
</script>