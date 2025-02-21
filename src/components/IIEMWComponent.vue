<template>
  <div class="input-container">
    <q-input outlined v-model="text1" :dense="dense" label="FETCH PHASE" readonly />
    <q-input outlined v-model="text2" :dense="dense" label="DECODE PHASE" readonly />
    <q-input outlined v-model="text3" :dense="dense" label="EXECUTE PHASE" readonly />
    <q-input outlined v-model="text4" :dense="dense" label="MEMORY ACCESS PHASE" readonly />
    <q-input outlined v-model="text5" :dense="dense" label="WRITE BACK PHASE" readonly />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'IIEMWComponent',

  setup () {
    const text1 = ref('ADDI');
    const text2 = ref('ADDIQ');
    const text3 = ref('ADDIQ');
    const text4 = ref('ADDIQ');
    const text5 = ref('ADDIQ');
    const dense = ref(false);

    return {
      text1,
      text2,
      text3,
      text4,
      text5,
      dense
    };
  }
});
</script>

<style scoped>
.input-container {
  display: flex;
  gap: 10px;
}
</style>
