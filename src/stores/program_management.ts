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

  const mipsStore = useMipsStore();

  const resetPipelinePhases = () => {
    fetchPhase.value = "";
    decodePhase.value = "";
    executePhase.value = "";
    memoryAccessPhase.value = "";
    writeBackPhase.value = "";

    instruction_data.value.splice(0, instruction_data.value.length, ...new Array(20).fill(""));
  };

  function skipInstruction() {
    writeBackPhase.value = memoryAccessPhase.value;
    memoryAccessPhase.value = executePhase.value;
    executePhase.value = decodePhase.value;
    decodePhase.value = fetchPhase.value;
    fetchPhase.value = mipsStore.getCurrentInstruction();

    if (fetchPhase.value !== "")
    {
      Write()
      Memory()
      Execute()
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

    if (fetchPhase.value == "NOP" || fetchPhase.value == "")
    {
      instruction_data.value[0] = "NOP"
      return;
    }

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
          instruction_data.value[6] = mipsStore.getRegisterValue(parseInt(instruction_data.value[6].replace('$R', '')));
          instruction_data.value[7] = mipsStore.getRegisterValue(parseInt(instruction_data.value[7].replace('$R', '')));
          break;
      }
    }
  }

  function Execute() {
    if (instruction_data.value[4] == "NOP" || instruction_data.value[4] == "")
    {
      instruction_data.value[8] = "NOP"
      return;
    }
    else
    {
      instruction_data.value[8] = instruction_data.value[4]
      instruction_data.value[9] = instruction_data.value[5]
      instruction_data.value[10] = instruction_data.value[6]
      instruction_data.value[11] = instruction_data.value[7]
      switch (instruction_data.value[8])
      {
        case "ADD":
          instruction_data.value[10] = Number(instruction_data.value[10]) + Number(instruction_data.value[11]);
          instruction_data.value[11] = 0;
          console.log(instruction_data.value[10]);
          break;
        case "SUB":
          instruction_data.value[10] = instruction_data.value[10] - instruction_data.value[11];
          instruction_data.value[11] = 0;
          console.log(instruction_data.value[10]);
          break;
        case "MUL":
          instruction_data.value[10] = Math.trunc(Number(instruction_data.value[10]) * Number(instruction_data.value[11]));
          instruction_data.value[11] = 0;
          console.log(instruction_data.value[10]);
          break;
        case "DIV":
          instruction_data.value[10] = Math.trunc(Number(instruction_data.value[10]) / Number(instruction_data.value[11]));
          instruction_data.value[11] = 0;
          console.log(instruction_data.value[10]);
          break;
        case "MULU":
        case "DIVU":



      }
    }
  }

  function Memory() {
    if (instruction_data.value[8] == "NOP" || instruction_data.value[8] == "")
    {
      instruction_data.value[12] = "NOP"
      return;
    }
    else
    {
      switch (instruction_data.value[8])
      {
        case "ADD":
        case "SUB":
        case "MUL":
        case "DIV":
        case "MULU":
        case "DIVU":
          instruction_data.value[12] = instruction_data.value[8];
          instruction_data.value[13] = instruction_data.value[9];
          instruction_data.value[14] = instruction_data.value[10];
          instruction_data.value[15] = instruction_data.value[11];
          break;

      }
    }


  }

  function Write() {
    if (instruction_data.value[12] == "NOP" || instruction_data.value[12] == "")
    {
      return;
    }
    else
    {
      switch (instruction_data.value[12])
      {
        case "ADD":
        case "SUB":
        case "MUL":
        case "DIV":
        case "MULU":
        case "DIVU":
          instruction_data.value[13] = parseInt(instruction_data.value[13].replace('$R', ''));
          mipsStore.setRegisterValue(instruction_data.value[13],instruction_data.value[14])
          break;

      }
    }

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
    instruction_data,
  };
});
