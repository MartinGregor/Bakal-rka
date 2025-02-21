<template>
  <q-layout view="hHh LpR lFr">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          MIPS Simulator
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <div class="q-pa-md" style="display: flex; flex-direction: column; height: 100%;">
        <q-banner class="bg-primary text-white" style="border-radius: 10px; margin-bottom: 5px;">
          <span class="text-h6">Instructions</span>
        </q-banner>

        <!-- Scrollable area for instructions -->
        <q-scroll-area style="flex: 1; overflow: auto;" class="custom-scroll" :visible="visible">
          <div class="column" >
            <div v-for="(instruction, index) in instructions" :key="index"
                 class="row items-center"
                 :style="{ marginBottom: space ? '5px' : '0px' }">
              <span class="q-mr-md" style="width: 10px; text-align: right;">{{ index }}</span>
              <q-input filled v-model="instructions[index]" dense class="col" />
            </div>
          </div>
        </q-scroll-area>

      </div>
    </q-drawer>


    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <div class="q-pa-md" style="display: flex; flex-direction: column; height: 100%;">

        <q-banner class="bg-primary text-white" style="border-radius: 10px; margin-bottom: 5px; text-align: left; padding-left: 10px;">
          <span class="text-h6">Registers</span>
        </q-banner>

        <!-- First scrollable area for registers -->
        <q-scroll-area style="flex: 1; overflow: auto;">
          <div class="column">
            <div v-for="(register, index) in registers" :key="index"
                 class="row items-center"
                 :style="{ marginBottom: space ? '5px' : '0px' }">
              <span class="q-mr-md" style="width: 10px; text-align: left;">{{ "R"+index }}</span>
              <q-input filled v-model="registers[index]" dense class="col" />
            </div>
          </div>
        </q-scroll-area>

        <!-- Separator between the two scroll areas -->
        <q-separator class="q-my-md" />

        <q-banner class="bg-primary text-white" style="border-radius: 10px; margin-bottom: 5px; text-align: left; padding-left: 10px;">
          <span class="text-h6">Data</span>
        </q-banner>

        <!-- Second scrollable area for data -->
        <q-scroll-area style="flex: 1; overflow: auto;">
          <div class="column">
            <div v-for="(d, index) in data" :key="index"
                 class="row items-center"
                 :style="{ marginBottom: space ? '5px' : '0px' }">
              <span class="q-mr-md" style="width: 10px; text-align: left;">{{ ""+index }}</span>
              <q-input filled v-model="data[index]" dense class="col" />
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
import {ref} from 'vue'

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);
    const instructions = ref(new Array(300).fill('NOP'));
    const registers = ref(new Array(32).fill(0));
    const data = ref(new Array(300).fill(0));

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value
      },
      text: ref(''),
      ph: ref(''),
      space: ref(true),
      visible: ref(false),
      instructions,
      registers,
      data
    }
  }
}
</script>
