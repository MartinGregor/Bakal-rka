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

  let playInterval: ReturnType<typeof setInterval> | null = null;

  function play(): void {
    pause();
    playInterval = setInterval(skipInstruction, 500);
  }

  function playfast(): void {
    pause();
    playInterval = setInterval(skipInstruction, 100);
  }

  function playinstant(): void {
    pause();
    playInterval = setInterval(skipInstruction, 1);
  }

  function pause(): void {
    if (playInterval !== null) {
      clearInterval(playInterval);
      playInterval = null;
    }
  }

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
      case "ADD": case "SUB": case "MUL": case "DIV":
      case "ADDI": case "SUBI": case "MULI": case "DIVI":
      if (
        parts.length === 4 &&
        parts[1] !== undefined && ValidRegister(parts[1]) &&
        parts[2] !== undefined && ValidRegister(parts[2]) &&
        parts[3] !== undefined && (instruction.endsWith("I") ? ValidNumber(parts[3]) : ValidRegister(parts[3]))
      ) {[instruction_data.value[0], instruction_data.value[1], instruction_data.value[2], instruction_data.value[3]] = parts;}
      else {
        console.log("Invalid " + (parts.length !== 4 ? "Syntax" : "Registers") + " - Replaced for NOP");
        instruction_data.value[0] = "NOP";
      }
      break;
      case "BEQ": case "BNEQ":
      if (parts.length === 4 && parts[1] !== undefined && ValidRegister(parts[1]) && parts[2] !== undefined
        && ValidRegister(parts[2]) && parts[3] !== undefined && ValidInstructionNumber(parts[3]))
      {[instruction_data.value[0], instruction_data.value[1], instruction_data.value[2], instruction_data.value[3]] = parts;}
      else {
        console.log(
          "Invalid " +
          (parts.length !== 4 ? "Syntax" :
            (parts[1] === undefined || !ValidRegister(parts[1]) ? "Registers" :
              (parts[2] === undefined || !ValidRegister(parts[2]) ? "Registers" :
                (parts[3] === undefined || !ValidInstructionNumber(parts[3]) ? "Instruction Number" : "")))) +
          " - Replaced for NOP");
        instruction_data.value[0] = "NOP";
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
        case "ADD": case "SUB": case "MUL": case "DIV":
          instruction_data.value[6] = mipsStore.getRegisterValue(parseInt(instruction_data.value[6].replace('$R', '')));
          instruction_data.value[7] = mipsStore.getRegisterValue(parseInt(instruction_data.value[7].replace('$R', '')));
          break;
        case "ADDI": case "SUBI": case "MULI": case "DIVI":
          instruction_data.value[6] = mipsStore.getRegisterValue(parseInt(instruction_data.value[6].replace('$R', '')));
          instruction_data.value[7] = parseInt(instruction_data.value[7].replace('$', ''));
          break;
        case "BEQ": case "BNEQ":
          instruction_data.value[5] = mipsStore.getRegisterValue(parseInt(instruction_data.value[5].replace('$R', '')));
          instruction_data.value[6] = mipsStore.getRegisterValue(parseInt(instruction_data.value[6].replace('$R', '')));
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
        case "ADD": case "ADDI":
          instruction_data.value[10] = Number(instruction_data.value[10]) + Number(instruction_data.value[11]);
          instruction_data.value[11] = 0;
          break;
        case "SUB": case "SUBI":
          instruction_data.value[10] = instruction_data.value[10] - instruction_data.value[11];
          instruction_data.value[11] = 0;
          break;
        case "MUL": case "MULI":
          instruction_data.value[10] = Math.trunc(Number(instruction_data.value[10]) * Number(instruction_data.value[11]));
          instruction_data.value[11] = 0;
          break;
        case "DIV": case "DIVI":
          instruction_data.value[10] = Math.trunc(Number(instruction_data.value[10]) / Number(instruction_data.value[11]));
          instruction_data.value[11] = 0;
          break;
        case "BEQ":
          if(instruction_data.value[9] === instruction_data.value[10])
          {
            mipsStore.setPC(parseInt(instruction_data.value[11].replace('$', '')))
          }
          instruction_data.value[8] = "NOP"
          break;
        case "BNEQ":
          if(instruction_data.value[9] !== instruction_data.value[10])
          {
            mipsStore.setPC(parseInt(instruction_data.value[11].replace('$', '')))
          }
          instruction_data.value[8] = "NOP"
          break;


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
        case "ADDI":
        case "SUBI":
        case "MULI":
        case "DIVI":
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
        case "ADDI":
        case "SUBI":
        case "MULI":
        case "DIVI":
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

  function ValidNumber(input: string): boolean {
    // Regular expression to match numbers like $-45, $45, $+123
    const numberRegex = /^\$([+-]?\d+)$/;

    return numberRegex.test(input);
  }

  function ValidInstructionNumber(input: string): boolean {
    if (!input.startsWith("$")) return false;

    const num = Number(input.slice(1));
    return !isNaN(num) && num >= 0 && num <= 299;
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
    play,
    pause,
    playinstant,
    playfast
  };
});
