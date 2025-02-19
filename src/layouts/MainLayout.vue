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
      <div class="q-pa-md q-gutter-md full-width" >
        <q-btn class="col" color="primary" label="Instructions Set"/>
        <q-btn class="col" push color="red" label="" icon="refresh">
          <q-popup-proxy>
            <q-banner class="q-pa-md">
              <div class="row items-center no-wrap">
                <q-icon name="warning" color="red" class="q-mr-md" size="sm"/>
                <span class="text">Delete all instructions?</span>
              </div>
              <q-separator class="q-my-sm" />
              <div class="row justify-end q-gutter-sm">
                <q-btn flat color="red" label="Yes" icon="delete" />
                <q-btn flat color="primary" label="No" icon="close" />
              </div>
            </q-banner>
          </q-popup-proxy>
        </q-btn>
      </div>

      <div class="q-pa-md">
        <div class="column" style="max-width: 300px">
          <div v-for="(instruction, index) in instructions" :key="index"
               class="row items-center"
               :style="{ marginBottom: space ? '5px' : '0px' }">
            <span class="q-mr-md" style="width: 10px; text-align: right;">{{ index }}</span>
            <q-input filled v-model="instructions[index]" dense class="col" />
          </div>
        </div>
      </div>
    </q-drawer>


    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <div class="q-pa-md">
        <div class="column" style="max-width: 300px">
          <div v-for="(register, index) in registers" :key="index"
               class="row items-center"
               :style="{ marginBottom: space ? '5px' : '0px' }">
            <span class="q-mr-md" style="width: 10px; text-align: left;">{{ "R"+index }}</span>
            <q-input filled v-model="registers[index]" dense class="col" />
          </div>
        </div>
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
    const data = ref(new Array(240).fill(0));

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
      instructions,
      registers,
      data
    }
  }
}
</script>
