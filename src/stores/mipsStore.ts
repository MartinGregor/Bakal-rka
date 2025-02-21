import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMipsStore = defineStore('mips', () => {
  // Store state for registers, data, and instructions
  const registers = ref(new Array(32).fill(0));
  const data = ref(new Array(300).fill(0));
  const instructions = ref(new Array(300).fill('NOP'));

  // Return the state to be used by components
  return { registers, data, instructions };
});
