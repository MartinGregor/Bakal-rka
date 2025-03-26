<template>
  <div class="input-container">
    <q-input outlined v-model="store.fetchPhase" :dense="dense" label="FETCH PHASE" readonly />
    <q-input outlined v-model="store.decodePhase" :dense="dense" label="DECODE PHASE" readonly />
    <q-input outlined v-model="store.executePhase" :dense="dense" label="EXECUTE PHASE" readonly />
    <q-input outlined v-model="store.memoryAccessPhase" :dense="dense" label="MEMORY ACCESS PHASE" readonly />
    <q-input outlined v-model="store.writeBackPhase" :dense="dense" label="WRITE BACK PHASE" readonly/>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import { useProgramManagementStore } from "stores/program_management";

export default defineComponent({
  name: "IIEMWComponent",

  setup() {
    const store = useProgramManagementStore();

    const pathColor1 = computed(() => colors[0]);
    const pathColor2 = computed(() => colors[1]);
    const pathColor3 = computed(() => colors[2]);
    const pathColor4 = computed(() => colors[3]);
    const pathColor5 = computed(() => colors[4]);

    return {
      store,
      dense: false,
      pathColor1,
      pathColor2,
      pathColor3,
      pathColor4,
      pathColor5,
    };
  },
});
</script>

<style scoped>
.input-container {
  display: flex;
  gap: 10px;
}
</style>
