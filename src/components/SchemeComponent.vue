<template>
  <div class="input-container">

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
