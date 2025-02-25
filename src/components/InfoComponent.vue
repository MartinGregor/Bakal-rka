<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row items-center">
      <!-- Instructions Button -->
      <q-btn round color="primary" text-color="white" icon="lightbulb">
        <q-tooltip anchor="top middle" self="bottom middle" class="bg-primary text-body2 text-white" :offset="[10, 10]">
          Instructions
        </q-tooltip>
        <q-popup-proxy>
          <div class="q-pa-md" style="max-width: 350px">
            <q-list bordered separator>
              <template v-for="instruction in instructions" :key="instruction[0]">
                <q-item clickable v-ripple>
                  <q-item-section>
                    <q-item-label>{{ instruction[0] }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-list>
            <q-list bordered separator>
              <template v-for="instruction in instructions" :key="instruction[0]">
                <q-item clickable v-ripple>
                  <q-item-section>
                    <q-item-label>{{ instruction[0] }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-list>
          </div>
        </q-popup-proxy>
      </q-btn>

      <!-- Settings Button -->
      <q-btn round color="white" text-color="blue" icon="settings">
        <q-tooltip anchor="top middle" self="bottom middle" class="bg-primary text-body2 text-white" :offset="[10, 10]">
          Settings
        </q-tooltip>
      </q-btn>

      <!-- Faculty Button -->
      <q-btn round color="white" text-color="green" icon="school">
        <q-tooltip anchor="top middle" self="bottom middle" class="bg-primary text-body2 text-white" :offset="[10, 10]">
          Faculty
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InfoComponent',
  data() {
    return {
      instructions: [
        ["LW", "Load Word", "LW rt, offset(rs)"],
        ["SW", "Store Word", "SW rt, offset(rs)"],
        ["BEQ", "Branch if Equal", "BEQ rs, rt, offset"],
        ["BNEQ", "Branch if Not Equal", "BNEQ rs, rt, offset"],
        ["ADD", "Addition", "ADD rd, rs, rt"],
        ["ADDI", "Addition Immediate", "ADDI rt, rs, immediate"],
        ["SUB", "Subtraction", "SUB rd, rs, rt"],
        ["SUBI", "Subtraction Immediate", "SUBI rt, rs, immediate"],
        ["MUL", "Multiply", "MUL rd, rs, rt"],
        ["MULU", "Multiply Unsigned", "MULU rd, rs, rt"],
        ["DIV", "Divide", "DIV rd, rs, rt"],
        ["DIVU", "Divide Unsigned", "DIVU rd, rs, rt"],
        ["AND", "Bitwise AND", "AND rd, rs, rt"],
        ["ANDI", "Bitwise AND Immediate", "ANDI rt, rs, immediate"],
        ["OR", "Bitwise OR", "OR rd, rs, rt"],
        ["ORI", "Bitwise OR Immediate", "ORI rt, rs, immediate"],
        ["XOR", "Bitwise XOR", "XOR rd, rs, rt"],
        ["XORI", "Bitwise XOR Immediate", "XORI rt, rs, immediate"],
        ["NOR", "Bitwise NOR", "NOR rd, rs, rt"],
        ["NORI", "Bitwise NOR Immediate", "NORI rt, rs, immediate"],
        ["LI", "Load Immediate", "LI rt, immediate"],
        ["LUI", "Load Upper Immediate", "LUI rt, immediate"],
        ["NOP", "No Operation", "NOP"],
        ["SLLV", "Shift Left Logical Variable", "SLLV rd, rt, rs"],
        ["SRLV", "Shift Right Logical Variable", "SRLV rd, rt, rs"]
      ]
    };
  }
});
</script>

<style scoped>
</style>
