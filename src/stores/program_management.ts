import { defineStore } from "pinia";
import { ref } from "vue";
import { useMipsStore } from "./mipsStore";

export const useProgramManagementStore = defineStore("programManagement", () => {
  const fetchPhase = ref("");
  const decodePhase = ref("");
  const executePhase = ref("");
  const memoryAccessPhase = ref("");
  const writeBackPhase = ref("");

  const instruction_data = ref(Array(20).fill(""));

  const resetPipelinePhases = () => {
    fetchPhase.value = "";
    decodePhase.value = "";
    executePhase.value = "";
    memoryAccessPhase.value = "";
    writeBackPhase.value = "";
  };




  const mipsStore = useMipsStore();

  function skipInstruction() {
    writeBackPhase.value = memoryAccessPhase.value;
    memoryAccessPhase.value = executePhase.value;
    executePhase.value = decodePhase.value;
    decodePhase.value = fetchPhase.value;
    fetchPhase.value = mipsStore.getCurrentInstruction();

    if (fetchPhase.value !== 'NOP' && fetchPhase.value !== "")
    {
      Decode()
      Fetch()
    }
    else
    {
      instruction_data.value[0] = "NOP"
      instruction_data.value[1] = 0
      instruction_data.value[2] = 0
      instruction_data.value[3] = 0
    }


    mipsStore.pc++;
  }

  function Fetch() {
    const parts = fetchPhase.value.split(" ");
    const instruction = parts[0];

    switch (instruction)
    {
      case "ADD":
      case "SUB":
      case "MUL":
      case "DIV":
      case "MULU":
      case "DIVU":
        if (parts.length == 4)
        {
          if (parts[1] !== undefined && ValidRegister(parts[1]) &&
            parts[2] !== undefined && ValidRegister(parts[2]) &&
            parts[3] !== undefined && ValidRegister(parts[3]))
          {
            instruction_data.value[0] = instruction
            instruction_data.value[1] = parts[1]
            instruction_data.value[2] = parts[2]
            instruction_data.value[3] = parts[3]
            console.log("Valid");
          }
          else
          {
            console.log("Invalid Registers - Replaced for NOP");
            instruction_data.value[0] = "NOP"
          }
        }
        else
        {
          console.log("Invalid Syntax - Replaced for NOP");
          instruction_data.value[0] = "NOP"
        }
        break;

      default:
        console.log("Unknown Instruction - Replaced for NOP");
        instruction_data.value[0] = "NOP";
        break;

    }

  }

  function Decode() {
    if (instruction_data.value[0] == "NOP" || instruction_data.value[0] == "")
    {
      instruction_data.value[4] = "NOP"
      return;
    }
    else
    {
      instruction_data.value[4] = instruction_data.value[0]
      instruction_data.value[5] = instruction_data.value[1]
      instruction_data.value[6] = instruction_data.value[2]
      instruction_data.value[7] = instruction_data.value[3]
      switch (instruction_data.value[4])
      {
        case "ADD":
        case "SUB":
        case "MUL":
        case "DIV":
        case "MULU":
        case "DIVU":
          instruction_data.value[5] = mipsStore.getRegisterValue(parseInt(instruction_data.value[5].replace('$R', '')));
          instruction_data.value[6] = mipsStore.getRegisterValue(parseInt(instruction_data.value[6].replace('$R', '')));
          instruction_data.value[7] = mipsStore.getRegisterValue(parseInt(instruction_data.value[7].replace('$R', '')));

          console.log(`Fetching values for registers:`);
          console.log(`Register ${instruction_data.value[5]} `);
          console.log(`Register ${instruction_data.value[6]} `);
          console.log(`Register ${instruction_data.value[7]} `);
          break;

      }
    }
  }

  function Execute()
  {

  }

  function Memory()
  {

  }

  function Write()
  {

  }

  function ValidRegister(register: string): boolean {
    // Regular expression to match $R0 to $R31
    const registerRegex = /^\$R([0-9]|[1-2][0-9]|3[0-1])$/;

    return registerRegex.test(register);
  }

  return {
    fetchPhase,
    decodePhase,
    executePhase,
    memoryAccessPhase,
    writeBackPhase,
    skipInstruction,
    resetPipelinePhases,
    Execute,
    Decode,
    Fetch,
    Write,
    Memory,
    ValidRegister,
    instruction_data,
  };
});
