<template>
  <div class="input-container">
    <q-input outlined v-model="store.fetchPhase" :dense="dense" label="FETCH PHASE" readonly />
    <q-input outlined v-model="store.decodePhase" :dense="dense" label="DECODE PHASE" readonly />
    <q-input outlined v-model="store.executePhase" :dense="dense" label="EXECUTE PHASE" readonly />
    <q-input outlined v-model="store.memoryAccessPhase" :dense="dense" label="MEMORY ACCESS PHASE" readonly />
    <q-input outlined v-model="store.writeBackPhase" :dense="dense" label="WRITE BACK PHASE" readonly />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useProgramManagementStore } from "stores/program_management";

export default defineComponent({
  name: "IIEMWComponent",

  setup() {
    const store = useProgramManagementStore();
    return { store, dense: false };
  },
});
</script>

<style scoped>
.input-container {
  display: flex;
  gap: 10px;
}
</style>
