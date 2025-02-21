<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn round color="red" icon="stop" />
    <q-btn round color="primary" icon="play_arrow" />
    <q-btn round color="primary"  text-color="white" icon="skip_next" />
    <q-btn round color="primary" icon="fast_forward" />
    <q-btn round color="white"  text-color="red" icon="replay" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TimeComponent'
});
</script>

<style scoped>
</style>
