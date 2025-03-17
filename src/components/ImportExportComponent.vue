<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row items-center">
      <!-- Reset Button -->
      <q-btn round color="red" text-color="white" icon="insert_drive_file" @click="resetAll">
        <q-tooltip anchor="top middle" self="bottom middle" class="bg-red text-body2 text-white" :offset="[10, 10]">
          New
        </q-tooltip>
      </q-btn>

      <!-- Export Button -->
      <q-btn round color="white" text-color="blue" icon="file_upload" @click="exportJson">
        <q-tooltip anchor="top middle" self="bottom middle" class="bg-primary text-body2 text-white" :offset="[10, 10]">
          Export
        </q-tooltip>
      </q-btn>

      <!-- Import Button (Triggers File Input) -->
      <q-btn round color="white" text-color="green" icon="file_download" @click="triggerFileInput">
        <q-tooltip anchor="top middle" self="bottom middle" class="bg-green text-body2 text-white" :offset="[10, 10]">
          Import
        </q-tooltip>
      </q-btn>

      <!-- Hidden File Input -->
      <input type="file" ref="fileInput" accept=".json" @change="handleFileUpload" style="display: none;" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useMipsStore } from 'stores/mipsStore';

export default defineComponent({
  name: 'ImportExportComponent',
  setup() {
    const mipsStore = useMipsStore();
    const fileInput = ref<HTMLInputElement | null>(null);

    // Function to reset all arrays
    const resetAll = () => {
      mipsStore.resetData();
    };

    // Trigger file input
    const triggerFileInput = () => {
      if (fileInput.value) {
        fileInput.value.value = '';
        fileInput.value.click();
      }
    };

    // Handle file upload and import JSON
    const handleFileUpload = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];

      if (file) {
        mipsStore.importJson(file);
      }
    };

    return {
      exportJson: mipsStore.exportJson,
      triggerFileInput,
      handleFileUpload,
      fileInput,
      resetAll,
    };
  }
});
</script>
