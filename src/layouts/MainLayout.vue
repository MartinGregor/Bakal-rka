<template>
  <q-layout view="hHh LpR lFr">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" alt="">
          </q-avatar>
          MIPS Simulator
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <div class="q-pa-md" style="display: flex; flex-direction: column; height: 100%; padding: 0">
        <div class="row items-center no-wrap" style="padding: 5px;">
          <q-banner class="bg-primary text-white col-grow" style="border-radius: 50px; text-align: center; padding: 0; min-height: 40px;">
            <span class="text-h6">Instructions</span>
          </q-banner>
        </div>

        <!-- Scrollable area for instructions -->
        <q-scroll-area style="flex: 1; overflow: auto;" class="custom-scroll" :visible="visible">
          <div class="column">
            <div v-for="(instruction, index) in instructions" :key="index"
                 class="row items-center"
                 :style="{ marginBottom: space ? '5px' : '0px' }">
              <q-input
                :model-value="index"
                dense
                class="col-2"
                disable
                readonly
                color="none"
                text-color="white"
                input-class="text-center"
                bg-color="none"
              />
              <q-input filled v-model="instructions[index]" dense class="col-10"/>
            </div>
          </div>
        </q-scroll-area>

      </div>
    </q-drawer>


    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <div class="q-pa-md" style="display: flex; flex-direction: column; height: 100%; padding: 0">


          <div class="row items-center no-wrap" style="padding: 5px">
            <q-btn round color="primary" text-color="white" icon="remove_circle_outline" class="q-mr-sm" @click="reset_registers">
              <q-tooltip anchor="center start" self="center right" class="bg-primary text-body2 text-white" :offset="[10, 10]">
                Erase Registers
              </q-tooltip>
            </q-btn>
            <q-banner class="bg-primary text-white col-grow" style="border-radius: 50px; text-align: center; padding: 0; min-height: 40px;">
              <span class="text-h6">Registers</span>
            </q-banner>
          </div>


        <!-- First scrollable area for registers -->
        <q-scroll-area style="flex: 1; overflow: auto;">
          <div class="column">
            <div v-for="(register, index) in registers" :key="index"
                 class="row items-center"
                 :style="{ marginBottom: space ? '5px' : '0px' }">
              <q-input :model-value="'R' + index" dense class="col-2" disable readonly color="none" text-color="white" input-class="text-center"/>
              <q-input filled v-model="registers[index]" :label="bin_hex(registers[index])" stack-label dense class="col" />
            </div>
          </div>
        </q-scroll-area>

        <!-- Separator between the two scroll areas -->
        <q-separator class="q-my-xs"/>

        <div class="row items-center no-wrap" style="padding: 0 5px 5px;">
          <q-btn round color="green" text-color="white" icon="remove_circle_outline" class="q-mr-sm" @click="reset_memory">
            <q-tooltip anchor="center start" self="center right" class="bg-green text-body2 text-white" :offset="[10, 10]">
              Erase Memory
            </q-tooltip>
          </q-btn>
          <q-banner class="bg-green text-white col-grow" style="border-radius: 50px; text-align: center; padding: 0; min-height: 40px;">
            <span class="text-h6">Memory</span>
          </q-banner>
        </div>

        <!-- Second scrollable area for memory -->
        <q-scroll-area style="flex: 1; overflow: auto">
          <div class="column">
            <div v-for="(d, index) in data" :key="index"
                 class="row items-center"
                 :style="{ marginBottom: space ? '5px' : '0px' }">
              <q-input
                :model-value="index"
                dense
                class="col-2 custom-input"
                disable
                readonly
                color="none"
                text-color="white"
                input-class="text-center"
                :label="mem_real(index)"
                stack-label
                label-class="text-right"
              />
              <q-input filled v-model="data[index]" :label="bin_hex(data[index])" dense class="col" />
            </div>
          </div>
        </q-scroll-area>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>


<script lang="ts">
import { ref, computed } from 'vue';
import { useMipsStore } from 'stores/mipsStore';

export default {
  setup() {
    const mipsStore = useMipsStore();

    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);
    const space = ref(true);
    const visible = ref(false);

    // Now accessing data directly from mipsStore
    const instructions = mipsStore.instructions;
    const registers = mipsStore.registers;
    const data = mipsStore.data;

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    const toggleRightDrawer = () => {
      rightDrawerOpen.value = !rightDrawerOpen.value;
    };

    const systemMode = computed(() => mipsStore.systemMode);

    const bin_hex = (num: number | undefined | null): string => {
      if (num === undefined || num === null) return "0";

      switch (systemMode.value) {
        case 'bin':  // Binary (BIN)
          return (num >>> 0).toString(2);
        case 'quad':  // Base 4 (QUAD)
          return (num >>> 0).toString(4);
        case 'oct':  // Octal (OCT)
          return (num >>> 0).toString(8);
        case 'hex':  // Hexadecimal (HEX)
          return (num >>> 0).toString(16).toUpperCase();
        case '32':  // Hexadecimal (HEX)
          return (num >>> 0).toString(32).toUpperCase();
        default:
          return num.toString();
      }
    };

    const mem_real = (num: number): string => {
      const result = num * 4;
      return result.toString(16).toUpperCase().padStart(4, '0');
    };

    const reset_registers = () => {
      mipsStore.resetRegisters();
    };

    const reset_memory = () => {
      mipsStore.resetMemory();
    };


    return {
      leftDrawerOpen,
      toggleLeftDrawer,
      rightDrawerOpen,
      toggleRightDrawer,
      space,
      visible,
      instructions,
      registers,
      data,
      bin_hex,
      mem_real,
      systemMode,
      reset_registers,
      reset_memory
    };
  }
};
</script>
