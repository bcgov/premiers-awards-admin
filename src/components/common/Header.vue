<template>
  <div>
    <h1>{{props.header}}</h1>
    <h4>{{props.lead}}</h4>
    <Divider />
  </div>
</template>

<script setup>
const props = defineProps(['header', 'lead']);
</script>