<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row items-center">
      <!-- Instructions Button -->
      <q-btn round color="primary" text-color="white" icon="lightbulb">
        <q-tooltip anchor="top middle" self="bottom middle" class="bg-primary text-body2 text-white" :offset="[10, 10]">
          Instructions
        </q-tooltip>
        <q-popup-proxy>
          <div class="q-pa-md" style="width: 600px; height: 400px; display: flex;">
            <!-- Left Column for Instructions (Scrollable) with Option Group -->
            <div style="flex: 0.5; padding-right: 0; height: 100%; overflow-y: auto;">
              <q-option-group
                v-model="selectedInstructionIndex"
                :options="instructionOptions"
                color="primary"
                right-label
              />
            </div>

            <!-- Right Column for Description (Scrollable) -->
            <div v-if="selectedInstruction" style="flex: 2; padding-left: 10px; height: 100%; overflow-y: auto;">
              <p><strong>{{ selectedInstruction[0] }}</strong> - {{ selectedInstruction[1] }}</p>
              <p><strong>{{"Syntax"}}</strong> - {{ selectedInstruction[2] }}</p>
              <p><strong>{{"Description"}}</strong> - {{ selectedInstruction[3] }}</p>
            </div>
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
        ["LW", "Load Word", "LW $R1 offset($R2)", "This instruction loads a word from memory into a register."],
        ["SW", "Store Word", "SW $R1 offset($R2)", "This instruction stores a word from a register into memory."],
        ["BEQ", "Branch if Equal", "BEQ $R1 $R2 Návestie", "This instruction branches if rs and rt are equal."],
        ["BNEQ", "Branch if Not Equal", "BNEQ $R1 $R2 Návestie", "This instruction branches if rs and rt are not equal."],
        ["ADD", "Addition", "ADD $R1 $R2 $R3", "This instruction adds the values in rs and rt and stores the result in rd."],
        ["ADDI", "Addition Immediate", "ADDI $R1 $5 $R3", "This instruction adds an immediate value to rs and stores the result in rt."],
        ["SUB", "Subtraction", "SUB $R1 $R2 $R3", "This instruction subtracts the value in rt from the value in rs and stores the result in rd."],
        ["SUBI", "Subtraction Immediate", "SUBI $R1 $R2 $5", "This instruction subtracts an immediate value from rs and stores the result in rt."],
        ["MUL", "Multiply", "MUL $R1 $R2 $R3", "This instruction multiplies the values in rs and rt and stores the result in rd."],
        ["MULI", "Multiply Immediate", "MULI $R1 $R2 $R5", "This instruction multiplies the values in rs and rt and stores the result in rd."],
        ["MULU", "Multiply Unsigned", "MULU $R1 $R2 $R3", "This instruction multiplies the values in rs and rt without considering signs and stores the result in rd."],
        ["DIV", "Divide Immidiate", "DIV $R1 $R2 $R3", "This instruction divides the value in rs by the value in rt and stores the quotient in rd."],
        ["DIVI", "Divide", "DIVI $R1 $R2 $5", "This instruction divides the value in rs by the value in rt and stores the quotient in rd."],
        ["DIVU", "Divide Unsigned", "DIVU $R1 $R2 $R3", "This instruction divides the values in rs and rt without considering signs."],
        ["AND", "Bitwise AND", "AND $R1 $R2 $R3", "This instruction performs a bitwise AND between rs and rt and stores the result in rd."],
        ["ANDI", "Bitwise AND Immediate", "ANDI $R1 $10001 $R2", "This instruction performs a bitwise AND between rs and an immediate value and stores the result in rt."],
        ["OR", "Bitwise OR", "OR $R1 $R2 $R3", "This instruction performs a bitwise OR between rs and rt and stores the result in rd."],
        ["ORI", "Bitwise OR Immediate", "ORI $R1 $10001 $R2", "This instruction performs a bitwise OR between rs and an immediate value and stores the result in rt."],
        ["XOR", "Bitwise XOR", "XOR $R1 $R2 $R3", "This instruction performs a bitwise XOR between rs and rt and stores the result in rd."],
        ["XORI", "Bitwise XOR Immediate", "XORI $R1 $10001 $R3", "This instruction performs a bitwise XOR between rs and an immediate value and stores the result in rt."],
        ["NOR", "Bitwise NOR", "NOR $R1 $R2 $R3", "This instruction performs a bitwise NOR between rs and rt and stores the result in rd."],
        ["NORI", "Bitwise NOR Immediate", "NORI $R1 $10001 $R2", "This instruction performs a bitwise NOR between rs and an immediate value and stores the result in rt."],
        ["LI", "Load Immediate", "LI $R1 5", "This instruction loads an immediate value into a register."],
        ["LUI", "Load Upper Immediate", "LI $R1 aa11", "This instruction loads an immediate value into the upper 16 bits of a register."],
        ["NOP", "No Operation", "NOP", "This instruction does nothing and is used as a placeholder."],
        ["SLLV", "Shift Left Logical Variable", "SLLV $R1 $R2 $R3", "This instruction shifts the value in rt left by the amount specified in rs and stores the result in rd."],
        ["SRLV", "Shift Right Logical Variable", "SRLV $R1 $R2 $R3", "This instruction shifts the value in rt right by the amount specified in rs and stores the result in rd."],
        ["J", "JUMP", "J $rt", "This instruction jump on rt"],
        ["JI", "JUMP Immediate", "JI 5 ", "This instruction jump on 5"],
        ["Q", "QUIT", "Q", "This instruction terminate the running program"]
      ],
      selectedInstructionIndex: 0,
    };
  },
  computed: {
    instructionOptions() {
      return this.instructions.map((instruction, index) => ({
        label: instruction[0],
        value: index,
      }));
    },
    selectedInstruction() {
      return this.instructions[this.selectedInstructionIndex];
    }
  }
});
</script>

<style scoped>
</style>
