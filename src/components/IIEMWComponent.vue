<template>
  <div class="input-container">
    <div class="input-wrapper" :style="{ borderBottom: `3px solid ${pathColor1}` }">
      <q-input outlined v-model="store.fetchPhase" :dense="dense" label="FETCH PHASE" readonly/>
    </div>
    <div class="input-wrapper" :style="{ borderBottom: `3px solid ${pathColor2}` }">
      <q-input outlined v-model="store.decodePhase" :dense="dense" label="DECODE PHASE" readonly/>
    </div>
    <div class="input-wrapper" :style="{ borderBottom: `3px solid ${pathColor3}` }">
      <q-input outlined v-model="store.executePhase" :dense="dense" label="EXECUTE PHASE" readonly/>
    </div>
    <div class="input-wrapper" :style="{ borderBottom: `3px solid ${pathColor4}` }">
      <q-input outlined v-model="store.memoryAccessPhase" :dense="dense" label="MEMORY ACCESS PHASE" readonly/>
    </div>
    <div class="input-wrapper" :style="{ borderBottom: `3px solid ${pathColor5}` }">
      <q-input outlined v-model="store.writeBackPhase" :dense="dense" label="WRITE BACK PHASE" readonly/>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import { useProgramManagementStore } from "stores/program_management";

export default defineComponent({
  name: "IIEMWComponent",

  setup() {
    const store = useProgramManagementStore();
    const colors = store.colors

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
  flex-direction: row; /* Change this from column to row */
  gap: 10px;
}
.input-wrapper {
  padding-bottom: 3px;
}
</style>
