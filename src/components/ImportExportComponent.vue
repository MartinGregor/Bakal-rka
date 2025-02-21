<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row items-center">
      <!-- New File Button -->
      <q-btn round color="white" text-color="red" icon="note_add">
        <q-popup-proxy>
          <q-banner class="q-pa-md">
            <div class="row items-center no-wrap">
              <q-icon name="warning" color="red" class="q-mr-md" size="sm"/>
              <span class="text">Start new file?</span>
            </div>
            <q-separator class="q-my-sm" />
            <div class="row justify-end q-gutter-sm">
              <q-btn flat color="red" label="Yes" icon="note_add" />
              <q-btn flat color="primary" label="No" icon="close" />
            </div>
          </q-banner>
        </q-popup-proxy>
      </q-btn>

      <!-- Import Button -->
      <q-btn round color="white" text-color="green" icon="file_upload" @click="triggerFileInput" />
      <input type="file" ref="fileInput" accept=".json" class="hidden" @change="handleFileUpload" />

      <!-- Export Button -->
      <q-btn round color="white" text-color="blue" icon="file_download" @click="exportJson" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ImportExportComponent',
  setup() {
    const fileInput = ref<HTMLInputElement | null>(null);
    const jsonData = ref<object | null>(null);

    // Trigger hidden file input for importing JSON
    const triggerFileInput = () => {
      fileInput.value?.click();
    };

    // Handle JSON file import
    const handleFileUpload = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0]; // Ensure we have a file

      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            jsonData.value = JSON.parse(e.target?.result as string);
            console.log("Imported JSON Data:", jsonData.value);
          } catch (error) {
            console.error("Invalid JSON file:", error);
          }
        };
        reader.readAsText(file);
      }
    };

    // Export JSON file
    const exportJson = () => {
      if (!jsonData.value) {
        alert("No JSON data to export!");
        return;
      }
      const jsonString = JSON.stringify(jsonData.value, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "exported_data.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    // Clear the JSON data (New File)
    const newFile = () => {
      jsonData.value = null;
      console.log("New file started. JSON data cleared.");
    };

    return {
      fileInput,
      jsonData,
      triggerFileInput,
      handleFileUpload,
      exportJson,
      newFile
    };
  }
});
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
