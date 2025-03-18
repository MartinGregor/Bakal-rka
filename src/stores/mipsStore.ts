// stores/mipsStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useProgramManagementStore } from 'stores/program_management';
import {useQuasar} from "quasar";

export const useMipsStore = defineStore('mipsStore', () => {
  // Arrays to store the instructions, registers, and data
  const instructions = ref(new Array(300).fill('NOP'));
  const registers = ref(new Array(32).fill(0));
  const data = ref(new Array(500).fill(0));
  const $q = useQuasar();

  const systemMode = ref('bin');

  const setSystemMode = (mode: string) => {
    systemMode.value = mode;
  };

  const language = ref('eng');

  const setLanguage = (mode: string) => {
    language.value = mode;
  };

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
    a.download = 'mips_simulator.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    $q.notify({
      message: 'Export file ready for save!',
      color: 'primary',
      position: 'bottom',
      timeout: 3000
    });

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

    $q.notify({
      message: 'File Imported successfully.!',
      color: 'green',
      position: 'bottom',
      timeout: 3000
    });
  };

  // New project blank
  const resetData = () => {
    instructions.value.splice(0, instructions.value.length, ...new Array(300).fill('NOP'));
    registers.value.splice(0, registers.value.length, ...new Array(32).fill(0));
    data.value.splice(0, data.value.length, ...new Array(500).fill(0));

    $q.notify({
      message: 'New Project!',
      color: 'red',
      position: 'bottom',
      timeout: 3000
    });

    programManagementStore.resetPipelinePhases();

    pc.value = 0;
  };

  const resetMemory = () => {
    data.value.splice(0, data.value.length, ...new Array(500).fill(0));

    $q.notify({
      message: 'Memory Erased!',
      color: 'green',
      position: 'bottom',
      timeout: 3000
    });

  };

  const resetRegisters = () => {
    registers.value.splice(0, registers.value.length, ...new Array(32).fill(0));

    $q.notify({
      message: 'Registers Erased!',
      color: 'primary',
      position: 'bottom',
      timeout: 3000
    });

  };

  const resetProgress = () => {
    programManagementStore.resetPipelinePhases();
    pc.value = 0;
  };

  const quitProgress = () => {
    programManagementStore.resetPipelinePhases();
    pc.value = -1;
  };


  //IIEMW Phase
  const programManagementStore = useProgramManagementStore();
  const pc = ref(0);
  const getCurrentInstruction = () => instructions.value[pc.value] || "NOP";

  const getRegisterValue = (registerIndex: number) => {
    if (registerIndex < 0 || registerIndex >= registers.value.length) {
      console.error("Invalid register index:", registerIndex);
      return 0;
    }
    return registers.value[registerIndex];
  };

  const setRegisterValue = (registerIndex: number, value: number) => {
    if (registerIndex < 0 || registerIndex >= registers.value.length) {
      console.error("Invalid register index:", registerIndex);
      return;
    }
    registers.value[registerIndex] = value;
  };

  const getDataValue = (dataIndex: number) => {
    if (dataIndex < 0 || dataIndex >= data.value.length) {
      console.error("Invalid data index:", dataIndex);
      return 0;
    }
    return data.value[dataIndex];
  };

  const setDataValue = (dataIndex: number, value: number) => {
    if (dataIndex < 0 || dataIndex >= data.value.length) {
      console.error("Invalid data index:", dataIndex);
      return;
    }
    data.value[dataIndex] = value;
  };

  const setPC = (value: number) => {
    if (value < 0 || value >= instructions.value.length) {
      console.error("Invalid Instruction index:", value);
      return;
    }
    pc.value = value - 1;
  };

  const getPC = () => {
    return pc.value;
  };

  return {
    instructions,
    registers,
    data,
    exportJson,
    importJson,
    resetData,
    resetProgress,
    getCurrentInstruction,
    getRegisterValue,
    setRegisterValue,
    getDataValue,
    setDataValue,
    setPC,
    getPC,
    pc,
    quitProgress,
    systemMode,
    setLanguage,
    setSystemMode,
    resetRegisters,
    resetMemory,

  };
});
