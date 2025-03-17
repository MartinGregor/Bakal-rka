<template>
  <div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useProgramManagementStore } from "stores/program_management";

export default defineComponent({
  name: "IIEMWComponent",

  setup() {
    const store = useProgramManagementStore();
    const splitterModel = ref(50);
    const insideModel = ref(50);

    return {
      store,
      splitterModel,
      insideModel,
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
