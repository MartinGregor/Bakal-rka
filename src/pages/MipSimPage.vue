<template>
  <q-page class="column items-start justify-start">
    <PanelComponent />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PanelComponent from 'components/PanelComponent.vue';

export default defineComponent({
  name: 'MipsimPage',
  components: {
    PanelComponent
  }
});
</script>

<style scoped>
.q-page {
  padding: 20px;
}
</style>
