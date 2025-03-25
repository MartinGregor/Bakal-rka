<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn round color="green" icon="pause" @click="pauseAndNotify">
      <q-tooltip anchor="top middle" self="bottom middle" class="bg-green text-body2 text-white" :offset="[10, 10]">
        Pause
      </q-tooltip>
    </q-btn>

    <q-btn round color="primary" text-color="white" icon="skip_next" @click="skipAndNotify">
      <q-tooltip anchor="top middle" self="bottom middle" class="bg-primary text-body2 text-white" :offset="[10, 10]">
        Skip
      </q-tooltip>
    </q-btn>

    <q-btn round color="primary" icon="play_arrow" @click="playAndNotify">
      <q-tooltip anchor="top middle" self="bottom middle" class="bg-primary text-body2 text-white" :offset="[10, 10]">
        Play
      </q-tooltip>
    </q-btn>

    <q-btn round color="primary" icon="fast_forward" @click="fastAndNotify">
      <q-tooltip anchor="top middle" self="bottom middle" class="bg-primary text-body2 text-white" :offset="[10, 10]">
        Fast
      </q-tooltip>
    </q-btn>

    <q-btn round color="primary" text-color="white" icon="speed" @click="instantAndNotify">
      <q-tooltip anchor="top middle" self="bottom middle" class="bg-primary text-body2 text-white" :offset="[10, 10]">
        Fastest
      </q-tooltip>
    </q-btn>

    <q-btn round color="none" text-color="green" icon="replay" @click="resetAndNotify">
      <q-tooltip anchor="top middle" self="bottom middle" class="bg-green text-body2 text-white" :offset="[10, 10]">
        Reset
      </q-tooltip>
    </q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';
import { useProgramManagementStore } from "stores/program_management";
import { useMipsStore} from "stores/mipsStore";

export default defineComponent({
  name: 'TimeComponent',
  setup() {
    const $q = useQuasar();
    const pms = useProgramManagementStore();
    const mips = useMipsStore();

    const notifyPause = () => {
      $q.notify({
        message: 'Paused',
        color: 'green',
        position: 'bottom',
        timeout: 2000
      });
    };

    const notifyPlay = () => {
      $q.notify({
        message: 'Play',
        color: 'primary',
        position: 'bottom',
        timeout: 2000
      });
    };

    const notifyFast = () => {
      $q.notify({
        message: 'Fast Play',
        color: 'primary',
        position: 'bottom',
        timeout: 2000
      });
    };

    const notifyReset = () => {
      $q.notify({
        message: 'Reset',
        color: 'green',
        position: 'bottom',
        timeout: 2000,
        textColor: 'none',
      });
    };

    const notifySkip = () => {
      $q.notify({
        message: 'Skipped',
        color: 'primary',
        position: 'bottom',
        timeout: 2000
      });
    };

    const notifyInstant = () => {
      $q.notify({
        message: 'Instant',
        color: 'primary',
        position: 'bottom',
        timeout: 2000
      });
    };

    const skipAndNotify = () => {
      pms.skipInstruction();
      notifySkip();
    };

    const playAndNotify = () => {
      pms.play();
      notifyPlay();
    };

    const pauseAndNotify = () => {
      pms.pause();
      notifyPause();
    };

    const fastAndNotify = () => {
      notifyFast();
      pms.playfast();
    };

    const resetAndNotify = () => {
      notifyReset();
      pms.pause();
      mips.resetProgress();
    };

    const instantAndNotify = () => {
      notifyInstant();
      pms.playinstant();
    };

    return {
      skipAndNotify,
      resetAndNotify,
      fastAndNotify,
      pauseAndNotify,
      playAndNotify,
      instantAndNotify
    };
  }
});
</script>

<style scoped>
</style>
