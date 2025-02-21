<template>
  <div class="panel-container">
    <div class="top-row">
      <TimeComponent />
      <ImportExportComponent />
    </div>
    <h2>Panel Component</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ImportExportComponent from 'components/ImportExportComponent.vue';
import TimeComponent from 'components/TimeComponent.vue';

export default defineComponent({
  name: 'PanelComponent',
  components: {
    ImportExportComponent,
    TimeComponent,
  }
});
</script>

<style scoped>
.panel-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* Center components at the top */
.top-row {
  display: flex;
  justify-content: center; /* Centers items horizontally */
  align-items: center; /* Aligns items vertically */
  gap: 20px; /* Space between components */
  width: 100%;
  padding: 10px;
}
</style>
