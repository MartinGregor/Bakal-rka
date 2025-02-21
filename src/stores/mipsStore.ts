// stores/mipsStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMipsStore = defineStore('mipsStore', () => {
  // Arrays to store the instructions, registers, and data
  const instructions = ref(new Array(300).fill('NOP'));
  const registers = ref(new Array(32).fill(0));
  const data = ref(new Array(300).fill(0));

  // Export JSON function
  const exportJson = () => {
    const jsonData = {
      registers: [...registers.value],
      data: [...data.value],
      instructions: [...instructions.value]
    };

    const jsonString = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import JSON function
  const importJson = (file: File) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const result = event.target?.result;
        if (typeof result === 'string') {
          const jsonData = JSON.parse(result);

          // Ensure reactivity by using .splice()
          if (Array.isArray(jsonData.instructions)) {
            instructions.value.splice(0, instructions.value.length, ...jsonData.instructions);
          }
          if (Array.isArray(jsonData.registers)) {
            registers.value.splice(0, registers.value.length, ...jsonData.registers);
          }
          if (Array.isArray(jsonData.data)) {
            data.value.splice(0, data.value.length, ...jsonData.data);
          }
        }
      } catch (error) {
        console.error("Error importing JSON:", error);
      }
    };

    reader.readAsText(file);
  };

  const resetData = () => {
    instructions.value.splice(0, instructions.value.length, ...new Array(300).fill('NOP'));
    registers.value.splice(0, registers.value.length, ...new Array(32).fill(0));
    data.value.splice(0, data.value.length, ...new Array(300).fill(0));
  };

  return {
    instructions,
    registers,
    data,
    exportJson,
    importJson,
    resetData
  };
});
