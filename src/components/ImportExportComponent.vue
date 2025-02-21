<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row items-center">
      <!-- Export Button -->
      <q-btn round color="white" text-color="blue" icon="file_download" @click="exportJson">
        <q-tooltip anchor="top middle" self="bottom middle" class="bg-primary text-body2 text-white" :offset="[10, 10]">
          Export
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMipsStore } from 'stores/mipsStore';

export default defineComponent({
  name: 'ImportExportComponent',
  setup() {
    const mipsStore = useMipsStore();

    // Export JSON file with registers, data, and instructions
    const exportJson = () => {
      const jsonData = {
        registers: mipsStore.registers,
        data: mipsStore.data,
        instructions: mipsStore.instructions
      };

      const jsonString = JSON.stringify(jsonData, null, 2);
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

    return {
      exportJson
    };
  }
});
</script>
