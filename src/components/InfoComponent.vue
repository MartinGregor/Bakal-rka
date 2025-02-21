<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row items-center">
      <!-- Reset Button -->
      <q-btn round color="primary" text-color="white" icon="lightbulb">
        <q-tooltip anchor="top middle" self="bottom middle" class="bg-primary text-body2 text-white" :offset="[10, 10]">
          Instructions
        </q-tooltip>
      </q-btn>

      <!-- Export Button -->
      <q-btn round color="white" text-color="blue" icon="settings" >
        <q-tooltip anchor="top middle" self="bottom middle" class="bg-primary text-body2 text-white" :offset="[10, 10]">
          Settings
        </q-tooltip>
      </q-btn>

      <!-- Import Button (Triggers File Input) -->
      <q-btn round color="white" text-color="green" icon="school" >
        <q-tooltip anchor="top middle" self="bottom middle" class="bg-primary text-body2 text-white" :offset="[10, 10]">
          Faculty
        </q-tooltip>
      </q-btn>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InfoComponent',
});
</script>

<style scoped>

</style>
