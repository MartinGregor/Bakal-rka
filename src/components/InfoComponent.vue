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
            <q-scroll-area style="flex: 0.5; padding-right: 0; height: 100%; overflow: auto;">
              <q-option-group
                v-model="selectedInstructionIndex"
                :options="instructionOptions"
                color="primary"
                right-label
              />
            </q-scroll-area>

            <!-- Right Column for Description (Scrollable) -->
            <div v-if="selectedInstruction" style="flex: 2; padding-left: 10px; height: 100%; overflow-y: auto;">
              <p><strong>{{ selectedInstruction[0] }}</strong> - {{ selectedInstruction[1] }}</p>
              <p><strong>{{"Syntax"}}</strong> - {{ selectedInstruction[2] }}</p>
              <p><strong>{{"Description"}}</strong> - {{ selectedInstruction[3] }}</p>
              <p><strong>{{"Example"}}</strong> - {{ selectedInstruction[4] }}</p>
              <p><strong>{{"Simplification"}}</strong> - {{ selectedInstruction[5] }}</p>
            </div>
          </div>
        </q-popup-proxy>
      </q-btn>

      <!-- Settings Button -->
      <q-btn round color="none" text-color="primary" icon="settings">
        <q-tooltip anchor="top middle" self="bottom middle" class="bg-primary text-body2 text-white" :offset="[10, 10]">
          Settings
        </q-tooltip>
        <q-popup-proxy>
          <q-banner dense>
            Choose system
            <q-icon right name="settings" />
          </q-banner>
          <div>
            <q-btn-toggle
              v-model="model"
              class="my-custom-toggle"
              no-caps
              rounded
              unelevated
              toggle-color="primary"
              color="none"
              text-color="primary"
              :options="[
              { label: 'BIN', value: 'bin' },
              { label: 'QUAD', value: 'quad' },
              { label: 'OCT', value: 'oct' },
              { label: 'HEX', value: 'hex' },
              { label: '32', value: '32' }
              ]"
              @update:model-value="setSystemMode"
            />
          </div>

          <q-banner dense>
            Choose language
            <q-icon right name="translate" />
          </q-banner>
          <div >
            <q-btn-toggle
              v-model="language"
              class="my-custom-toggle"
              no-caps
              unelevated
              rounded
              toggle-color="primary"
              color="none"
              text-color="primary"
              :options="[
              { label: 'ENG', value: 'bin' },
              { label: 'SK', value: 'quad' },
              { label: 'GER', value: 'oct' },
              { label: 'SPA', value: 'hex' },
              { label: 'UK', value: '32' }
              ]"
            />
          </div>

          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>{{ light ? 'Dark mode' : 'Light mode' }}</q-item-label>
              <q-item-label caption>Switch between dark/light modes</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-toggle
                v-model="light"
                @update:model-value="toggleDarkMode"
                :icon="light ? 'brightness_2' : 'wb_sunny'"
                size="md"
              />
            </q-item-section>
          </q-item>
        </q-popup-proxy>
      </q-btn>

      <!-- Development Button -->
      <q-btn round color="none" text-color="green" icon="school">
        <q-tooltip anchor="top middle" self="bottom middle" class="bg-green text-body2 text-white" :offset="[10, 10]">
          Development
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useMipsStore } from 'stores/mipsStore';
import { useQuasar} from "quasar";

export default defineComponent({
  name: 'InfoComponent',
  data() {

    const mipsStore = useMipsStore();
    const $q = useQuasar()
    $q.dark.set(false)

    return {
      model: mipsStore.systemMode,
      setSystemMode: mipsStore.setSystemMode,

      light: ref(false),

      instructions: [
        ["LW", "Load Word", "LW $Rx $Ry $i", "This instruction loads a word from memory into a Register", "LW $R1 $R2 $5", "Loads a word from memory (5 + R2) into Register R1"],
        ["LWI", "Load Word Immediate", "LWI $Rx $Ry $memory", "This instruction loads a word from memory into a register", "LWI $R1 $5 $7", "Loads a word from memory (7 + 5) into Register R1"],
        ["SW", "Store Word", "SW $Rx $Ry $i", "This instruction stores a word from a register into memory", "SW $R1 $R2 $5", "Stores the value from Register R1 into memory at (5 + R2)"],
        ["SWI", "Store Word Immediate", "SWI $Rx $Ry $memory", "This instruction stores a word from a register into memory", "SWI $R1 $5 $7", "Stores the value from Register R1 into memory at (7 + 5)"],
        ["BEQ", "Branch if Equal", "BEQ $Rx $Ry $instruction", "This instruction branches if the values in registers $R1 and $R2 are equal", "BEQ $R1 $R2 $5", "Branches if the values in R1 and R2 are equal on instruction 5"],
        ["BNEQ", "Branch if Not Equal", "BNEQ $R1 $R2 $instruction", "This instruction branches if the values in registers $R1 and $R2 are not equal", "BNEQ $R1 $R2 $5", "Branches if the values in R1 and R2 are not equal on instruction 5"],
        ["ADD", "Addition", "ADD $Rx $Ry $Rz", "This instruction adds the values in two registers and stores the result in one", "ADD $R1 $R2 $R3", "Adds the values in R2 and R3, stores the result in R1"],
        ["ADDI", "Addition Immediate", "ADDI $Rx $Ry $i", "This instruction adds an immediate value to the value in register and stores the result in register", "ADDI $R1 $R2 $5", "Adds 5 to the value in R2, stores the result in R1"],
        ["SUB", "Subtraction", "SUB $Rx $Ry $Rz", "This instruction subtracts the values in two registers and stores the result in one", "SUB $R1 $R2 $R3", "Subtracts the value in R3 from the value in R2, stores the result in R1"],
        ["SUBI", "Subtraction Immediate", "SUBI $Rx $Ry $i", "This instruction subtracts an immediate value from the value in register and stores the result in register", "SUBI $R1 $R2 $5", "Subtracts 5 from the value in R2, stores the result in R1"],
        ["MUL", "Multiply", "MUL $Rx $Ry $Rz", "This instruction multiplies the values in registers and stores the result in register", "MUL $R1 $R2 $R3", "Multiplies the values in R2 and R3, stores the result in R1"],
        ["MULI", "Multiply Immediate", "MULI $Rx $Ry $i", "This instruction multiplies the value in register by an immediate value and stores the result in register", "MULI $R1 $R2 $5", "Multiplies the value in R2 by 5, stores the result in R1"],
        ["MULU", "Multiply Unsigned", "MULU $Rx $Ry $Rz", "This instruction multiplies the values in registers without considering their signs and stores the result in register", "MULU $R1 $R2 $R3", "Multiplies the unsigned values in R2 and R3, stores the result in R1"],
        ["DIV", "Divide", "DIV $Rx $Ry $Rz", "This instruction divides the value in register by the value in register and stores the result in register", "DIV $R1 $R2 $R3", "Divides the value in R2 by the value in R3, stores the result in R1"],
        ["DIVI", "Divide Immediate", "DIVI $Rx $Ry $i", "This instruction divides the value in register by an immediate value and stores the result in register", "DIVI $R1 $R2 $5", "Divides the value in R2 by 5, stores the result in R1"],
        ["DIVU", "Divide Unsigned", "DIVU $Rx $Ry $Rz", "This instruction divides the values in registers without considering their signs and stores the result in register", "DIVU $R1 $R2 $R3", "Divides the unsigned values in R2 and R3, stores the result in R1"],
        ["AND", "Bitwise AND", "AND $Rx $Ry $Rz", "This instruction performs a bitwise AND operation between the values in registers, storing the result in register", "AND $R1 $R2 $R3", "Performs a bitwise AND between the values in R2 and R3, stores the result in R1"],
        ["ANDI", "Bitwise AND Immediate", "ANDI $Rx $Ry $i", "This instruction performs a bitwise AND operation between the value in register and an immediate value, storing the result in register", "ANDI $R1 $R2 $5", "Performs a bitwise AND between the value in R2 and 5, stores the result in R1"],
        ["OR", "Bitwise OR", "OR $Rx $Ry $Rz", "This instruction performs a bitwise OR operation between the values in registers, storing the result in register", "OR $R1 $R2 $R3", "Performs a bitwise OR between the values in R2 and R3, stores the result in R1"],
        ["ORI", "Bitwise OR Immediate", "ORI $Rx $Ry $i", "This instruction performs a bitwise OR operation between the value in register and an immediate value, storing the result in register", "ORI $R1 $R2 $5", "Performs a bitwise OR between the value in R2 and 5, stores the result in R1"],
        ["XOR", "Bitwise XOR", "XOR $Rx $Ry $Rz", "This instruction performs a bitwise XOR operation between the values in registers, storing the result in register", "XOR $R1 $R2 $R3", "Performs a bitwise XOR between the values in R2 and R3, stores the result in R1"],
        ["XORI", "Bitwise XOR Immediate", "XORI $Rx $Ry $i", "This instruction performs a bitwise XOR operation between the value in register and an immediate value, storing the result in register", "XORI $R1 $R2 $5", "Performs a bitwise XOR between the value in R2 and 5, stores the result in R1"],
        ["NAND", "Bitwise NAND", "NAND $Rx $Ry $Rz", "This instruction performs a bitwise NAND operation between the values in registers, storing the result in register", "NAND $R1 $R2 $R3", "Performs a bitwise NAND between the values in R2 and R3, stores the result in R1"],
        ["NANDI", "Bitwise NAND Immediate", "NANDI $Rx $Ry $i", "This instruction performs a bitwise NAND operation between the value in register and an immediate value, storing the result in register", "NANDI $R1 $R2 $5", "Performs a bitwise NAND between the value in R2 and 5, stores the result in R1"],
        ["NOR", "Bitwise NOR", "NOR $Rx $Ry $Rz", "This instruction performs a bitwise NOR operation between the values in registers, storing the result in register", "NOR $R1 $R2 $R3", "Performs a bitwise NOR between the values in R2 and R3, stores the result in R1"],
        ["NORI", "Bitwise NOR Immediate", "NORI $Rx $Ry $i", "This instruction performs a bitwise NOR operation between the value in register and an immediate value, storing the result in register", "NORI $R1 $R2 $5", "Performs a bitwise NOR between the value in R2 and 5, stores the result in R1"],
        ["XNOR", "Bitwise XNOR", "XNOR $Rx $Ry $Rz", "This instruction performs a bitwise XNOR operation between the values in registers, storing the result in register", "XNOR $R1 $R2 $R3", "Performs a bitwise XNOR between the values in R2 and R3, stores the result in R1"],
        ["XNORI", "Bitwise XNORI Immediate", "XNORI $Rx $Ry $i", "This instruction performs a bitwise XNOR operation between the value in register and an immediate value, storing the result in register", "XNORI $R1 $R2 $5", "Performs a bitwise XNOR between the value in R2 and 5, stores the result in R1"],
        ["LI", "Load Immediate", "LI $Rx $i", "This instruction loads an immediate value into register", "LI $R1 5", "Loads the immediate value 5 into register R1"],
        ["LUI", "Load Upper Immediate", "LUI $Rx $i", "This instruction loads an immediate value into the upper 16 bits of register", "LUI $R1 5", "Loads the immediate value 5 into the upper 16 bits of R1"],
        ["NOP", "No Operation", "NOP", "No operation, does nothing.", "NOP", "This instruction does nothing and is used as a placeholder"],
        ["SLLV", "Shift Left Logical Variable", "SLLV $Rx $Ry $Rz", "This instruction shifts the value in register left by the number of positions specified in register and stores the result in register", "SLLV $R1 $R2 $R3", "Shifts the value in R2 left by the amount in R3, stores the result in R1"],
        ["SRLV", "Shift Right Logical Variable", "SRLV $Rx $Ry $Rz", "This instruction shifts the value in register right by the number of positions specified in register and stores the result in register", "SRLV $R1 $R2 $R3", "Shifts the value in R2 right by the amount in R3, stores the result in R1"],
        ["SLLVI", "Shift Left Logical Variable Immediate", "SLLVI $Rx $Ry $i", "This instruction shifts the value in register left by an immediate amount and stores the result in register", "SLLVI $R1 $R2 $5", "Shifts the value in R2 left by 5, stores the result in R1"],
        ["SRLVI", "Shift Right Logical Variable Immediate", "SRLVI $Rx $Ry $i", "This instruction shifts the value in register right by an immediate amount and stores the result in register", "SRLVI $R1 $R2 $5", "Shifts the value in R2 right by 5, stores the result in R1"],
        ["J", "JUMP", "J $instruction", "This instruction jumps to the specified instruction address immediately", "J $5", "Jumps to the instruction 5"],
        ["Q", "QUIT", "Q", "This instruction terminates the running program.", "Q", "Terminates the program"]
      ],
      selectedInstructionIndex: 0,
      language: 'bin',
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
  },
  methods: {
    toggleDarkMode() {
      const isDarkMode = this.$q.dark.isActive;
      const newMode = !isDarkMode;

      this.$q.dark.set(newMode);

      this.$q.notify({
        message: newMode ? 'Dark mode has been set!' : 'Light mode has been set!',
        color: newMode ? 'none' : 'white',
        textColor: newMode ? 'white' : 'black',
        position: 'bottom',
        timeout: 2000
      });
    }
  }
});
</script>

<style scoped>
</style>
