<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn round color="green" icon="pause" @click="notifyPause">
      <q-tooltip anchor="top middle" self="bottom middle" class="bg-green text-body2 text-white" :offset="[10, 10]">
        Pause
      </q-tooltip>
    </q-btn>

    <q-btn round color="primary" icon="play_arrow">
      <q-tooltip anchor="top middle" self="bottom middle" class="bg-primary text-body2 text-white" :offset="[10, 10]">
        Play
      </q-tooltip>
    </q-btn>

    <q-btn round color="primary" text-color="white" icon="skip_next">
      <q-tooltip anchor="top middle" self="bottom middle" class="bg-primary text-body2 text-white" :offset="[10, 10]">
        Skip
      </q-tooltip>
    </q-btn>

    <q-btn round color="primary" icon="fast_forward">
      <q-tooltip anchor="top middle" self="bottom middle" class="bg-primary text-body2 text-white" :offset="[10, 10]">
        Fast
      </q-tooltip>
    </q-btn>

    <q-btn round color="white" text-color="red" icon="replay">
      <q-tooltip anchor="top middle" self="bottom middle" class="bg-primary text-body2 text-white" :offset="[10, 10]">
        Restart
      </q-tooltip>
    </q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'TimeComponent',
  setup() {
    const $q = useQuasar();

    const notifyPause = () => {
      $q.notify({
        message: 'Paused',
        color: 'green',
        position: 'top',
        timeout: 2000
      });
    };

    return {
      notifyPause
    };
  }
});
</script>

<style scoped>
</style>
