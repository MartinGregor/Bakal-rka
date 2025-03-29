import { defineStore } from "pinia";
import { ref } from "vue";
import { useMipsStore } from "./mipsStore";
import {useQuasar} from "quasar";

export const useProgramManagementStore = defineStore("programManagement", () => {
  const $q = useQuasar();
  const fetchPhase = ref("");
  const decodePhase = ref("");
  const executePhase = ref("");
  const memoryAccessPhase = ref("");
  const writeBackPhase = ref("");
  const instruction_data = ref(Array(20).fill(""));

  const mipsStore = useMipsStore();

  const colors = ref(Array(5).fill("lightgrey"));
  const colorList = ["#00264d", "#004c99", "#0073e6", "#3399ff", "#80c1ff"];
  let step = 0;

  const resetPipelinePhases = () => {
    fetchPhase.value = "";
    decodePhase.value = "";
    executePhase.value = "";
    memoryAccessPhase.value = "";
    writeBackPhase.value = "";

    step = 0;
    colors.value.splice(0, colors.value.length, ...new Array(5).fill("lightgrey"));

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

    ChangeColor()

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
      case "ADD": case "SUB": case "MUL": case "DIV": case "AND": case "OR": case "XOR": case "NAND": case "NOR": case "XNOR":
      case "ADDI": case "SUBI": case "MULI": case "DIVI": case "ANDI": case "ORI": case "XORI": case "NANDI": case "NORI": case "XNORI":
      case "SLLV": case "SLLVI": case "SRLV": case "SRLVI": case "MULU": case "DIVU":
      if(
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

      case "L": case "LI": case "LU": case "LUI":
      if (
        parts.length === 3 &&
        parts[1] !== undefined && ValidRegister(parts[1]) &&
        parts[2] !== undefined && (instruction.endsWith("I") ? ValidNumber(parts[2]) : ValidRegister(parts[2]))
      ) {[instruction_data.value[0], instruction_data.value[1], instruction_data.value[2]] = parts;
        instruction_data.value[3] = 0}
      else {
        console.log("Invalid " + (parts.length !== 3 ? "Syntax" : "Registers") + " - Replaced for NOP");
        instruction_data.value[0] = "NOP";
      }
      break;

      case "J":
        if (parts.length === 2 && parts[1] !== undefined && ValidInstructionNumber(parts[1])) {
          [instruction_data.value[0], instruction_data.value[1]] = parts;
        } else {
          console.log(
            "Invalid " +
            (parts.length !== 2 ? "Syntax" :
              (parts[1] === undefined || !ValidInstructionNumber(parts[1]) ? "Instruction Number" : "")) +
            " - Replaced for NOP"
          );
          instruction_data.value[0] = "NOP";
        }
        break;

      case "LW": case "SW": case "LWI": case "SWI":
      if (
        parts.length === 4 &&
        parts[1] !== undefined && ValidRegister(parts[1]) &&
        parts[2] !== undefined && (instruction.endsWith("I") ? ValidNumber(parts[2]) : ValidRegister(parts[2])) &&
        parts[3] !== undefined && ValidData(parts[3])
      ) {[instruction_data.value[0], instruction_data.value[1], instruction_data.value[2], instruction_data.value[3]] = parts;}
      else {
        console.log("Invalid " + (parts.length !== 4 ? "Syntax" : "Registers/Data") + " - Replaced for NOP");
        instruction_data.value[0] = "NOP";
      }
      break;

      case "Q":
        pause()
        mipsStore.quitProgress();

        $q.notify({
          message: 'Simulation Ended!',
          color: 'primary',
          position: 'bottom',
          timeout: 3000
        });

        break;

      default:
        console.log("Unknown Instruction - Replaced for NOP");
        $q.notify({
          message: 'Unknown Instruction! - replaced with NOP',
          color: 'red',
          position: 'bottom',
          timeout: 3000
        });
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
        case "ADD": case "SUB": case "MUL": case "DIV": case "AND": case "OR": case "XOR": case "NAND": case "NOR": case "XNOR":
        case "SLLV": case "SRLV": case "MULU": case "DIVU":
          instruction_data.value[6] = mipsStore.getRegisterValue(parseInt(instruction_data.value[6].replace('$R', '')));
          instruction_data.value[7] = mipsStore.getRegisterValue(parseInt(instruction_data.value[7].replace('$R', '')));
          break;
        case "ADDI": case "SUBI": case "MULI": case "DIVI": case "ANDI": case "ORI": case "XORI": case "NANDI": case "NORI": case "XNORI": case "SLLVI": case "SRLVI":
          instruction_data.value[6] = mipsStore.getRegisterValue(parseInt(instruction_data.value[6].replace('$R', '')));
          instruction_data.value[7] = parseInt(instruction_data.value[7].replace('$', ''));
          break;
        case "BEQ": case "BNEQ":
          instruction_data.value[5] = mipsStore.getRegisterValue(parseInt(instruction_data.value[5].replace('$R', '')));
          instruction_data.value[6] = mipsStore.getRegisterValue(parseInt(instruction_data.value[6].replace('$R', '')));
          break;
        case "L": case "LU":
          instruction_data.value[6] = mipsStore.getRegisterValue(parseInt(instruction_data.value[6].replace('$R', '')));
          break;
        case "LI": case "LUI":
          instruction_data.value[6] = parseInt(instruction_data.value[6].replace('$', ''));
          break;
        case "LW":
          instruction_data.value[6] = mipsStore.getRegisterValue(parseInt(instruction_data.value[6].replace('$R', '')));
          instruction_data.value[7] = parseInt(instruction_data.value[7].replace('$', ''));
          break;
        case "LWI":
          instruction_data.value[6] = parseInt(instruction_data.value[6].replace('$', ''));
          instruction_data.value[7] = parseInt(instruction_data.value[7].replace('$', ''));
          break;
        case "SW":
          instruction_data.value[5] = mipsStore.getRegisterValue(parseInt(instruction_data.value[5].replace('$R', '')));
          instruction_data.value[6] = mipsStore.getRegisterValue(parseInt(instruction_data.value[6].replace('$R', '')));
          instruction_data.value[7] = parseInt(instruction_data.value[7].replace('$', ''));
          break;
        case "SWI":
          instruction_data.value[5] = mipsStore.getRegisterValue(parseInt(instruction_data.value[5].replace('$R', '')));
          instruction_data.value[6] = parseInt(instruction_data.value[6].replace('$', ''));
          instruction_data.value[7] = parseInt(instruction_data.value[7].replace('$', ''));
          break;
        case "J":
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
        case "ADD": case "ADDI":
          instruction_data.value[10] = Number(instruction_data.value[10]) + Number(instruction_data.value[11]);
          instruction_data.value[11] = 0;
          break;
        case "SUB": case "SUBI":
          instruction_data.value[10] = Number(instruction_data.value[10]) - Number(instruction_data.value[11]);
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
        case "MULU":
          instruction_data.value[10] = (Number(instruction_data.value[10]) >>> 0) * (Number(instruction_data.value[11]) >>> 0) >>> 0;
          instruction_data.value[11] = 0;
          break;
        case "DIVU":
          instruction_data.value[10] = Math.trunc((Number(instruction_data.value[10]) >>> 0) / (Number(instruction_data.value[11]) >>> 0));
          instruction_data.value[11] = 0;
          break;
        case "AND": case "ANDI":
          instruction_data.value[10] = BigInt(instruction_data.value[10]) & BigInt(instruction_data.value[11]);
          instruction_data.value[11] = 0;
          break;
        case "NAND": case "NANDI":
          instruction_data.value[10] = ~(BigInt(instruction_data.value[10]) & BigInt(instruction_data.value[11]));
          instruction_data.value[11] = 0;
          break;
        case "OR": case "ORI":
          instruction_data.value[10] = (BigInt(instruction_data.value[10]) | BigInt(instruction_data.value[11]));
          instruction_data.value[11] = 0;
          break;
        case "NOR": case "NORI":
          instruction_data.value[10] = ~(BigInt(instruction_data.value[10]) | BigInt(instruction_data.value[11]));
          instruction_data.value[11] = 0;
          break;
        case "XOR": case "XORI":
          instruction_data.value[10] = (BigInt(instruction_data.value[10]) ^ BigInt(instruction_data.value[11]));
          instruction_data.value[11] = 0;
          break;
        case "XNOR": case "XNORI":
          instruction_data.value[10] = ~(BigInt(instruction_data.value[10]) ^ BigInt(instruction_data.value[11]));
          instruction_data.value[11] = 0;
          break;
        case "SLLV": case "SLLVI":
          instruction_data.value[10] = (BigInt(instruction_data.value[10]) << BigInt(instruction_data.value[11])).toString();
          instruction_data.value[11] = "0";
          break;
        case "SRLV": case "SRLVI":
          instruction_data.value[10] = (BigInt(instruction_data.value[10]) >> BigInt(instruction_data.value[11])).toString();
          instruction_data.value[11] = "0";
          break;
        case "LU": case "LUI":
          instruction_data.value[10] = (BigInt(instruction_data.value[10]) & BigInt(0xFFFF0000) | (BigInt(instruction_data.value[11]) << BigInt(16))).toString();
          instruction_data.value[11] = "0";
          break;
        case "BEQ":
          if (String(instruction_data.value[9]) === String(instruction_data.value[10]))
          {mipsStore.setPC(parseInt(instruction_data.value[11].replace('$', '')))}
          instruction_data.value[8] = "NOP"
          break;
        case "BNEQ":
          if (String(instruction_data.value[9]) !== String(instruction_data.value[10]))
          {mipsStore.setPC(parseInt(instruction_data.value[11].replace('$', '')))}
          instruction_data.value[8] = "NOP"
          break;
        case "J":
          mipsStore.setPC(parseInt(instruction_data.value[9].replace('$', '')))
          instruction_data.value[8] = "NOP"
          break;
        case "LW": case "LWI":
          instruction_data.value[10] = Number(instruction_data.value[10]) + Number(instruction_data.value[11]);
          instruction_data.value[11] = 0;
          if(0 <= instruction_data.value[10] && instruction_data.value[10] <= 499)
          {
            break;
          }
          console.log("Invalid memory space");
          $q.notify({
            message: 'Invalid memory space!',
            color: 'red',
            position: 'bottom',
            timeout: 3000
          });
          instruction_data.value[8] = "NOP"
          break;
        case "SW": case "SWI":
          instruction_data.value[9] = Number(instruction_data.value[9])
          instruction_data.value[10] = Number(instruction_data.value[10]) + Number(instruction_data.value[11]);
          if(0 <= instruction_data.value[10] && instruction_data.value[10] <= 499)
          {
            break;
          }
          console.log("Invalid memory space");
          $q.notify({
            message: 'Invalid memory space!',
            color: 'red',
            position: 'bottom',
            timeout: 3000
          });
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
        case "ADD": case "SUB": case "MUL": case "DIV": case "AND": case "OR": case "XOR": case "NAND": case "NOR": case "XNOR":
        case "ADDI": case "SUBI": case "MULI": case "DIVI": case "ANDI": case "ORI": case "XORI": case "NANDI": case "NORI": case "XNORI":
        case "SLLV": case "SLLVI": case "SRLV": case "SRLVI": case "L": case "LI": case "LU": case "LUI": case "MULU": case "DIVU":
          instruction_data.value[12] = instruction_data.value[8];
          instruction_data.value[13] = instruction_data.value[9];
          instruction_data.value[14] = instruction_data.value[10];
          instruction_data.value[15] = instruction_data.value[11];
          break;

        case "LW": case "LWI":
          instruction_data.value[10] = mipsStore.getDataValue(instruction_data.value[10]);
          instruction_data.value[12] = instruction_data.value[8];
          instruction_data.value[13] = instruction_data.value[9];
          instruction_data.value[14] = instruction_data.value[10];
          instruction_data.value[15] = instruction_data.value[11];
          break;

        case "SW": case "SWI":
          mipsStore.setDataValue(instruction_data.value[10],instruction_data.value[9]);
          instruction_data.value[12] = "NOP";
          instruction_data.value[13] = instruction_data.value[9];
          instruction_data.value[14] = instruction_data.value[10];
          instruction_data.value[15] = instruction_data.value[11];
          break;
      }
    }


  }

  function Write() {
    if (mipsStore.getPC() > 304) {
      pause();
      mipsStore.quitProgress();

      $q.notify({
        message: 'Simulation Ended!',
        color: 'primary',
        position: 'bottom',
        timeout: 3000
      });
    }

    if (instruction_data.value[12] == "NOP" || instruction_data.value[12] == "")
    {
      return;
    }
    else
    {
      switch (instruction_data.value[12])
      {
        case "ADD": case "SUB": case "MUL": case "DIV": case "AND": case "OR": case "XOR": case "NAND": case "NOR": case "XNOR":
        case "ADDI": case "SUBI": case "MULI": case "DIVI": case "ANDI": case "ORI": case "XORI": case "NANDI": case "NORI": case "XNORI":
        case "SLLV": case "SLLVI": case "SRLV": case "SRLVI": case "L": case "LI": case "LU": case "LUI": case "MULU": case "DIVU": case "LW": case "LWI":
          instruction_data.value[13] = parseInt(instruction_data.value[13].replace('$R', ''));
          mipsStore.setRegisterValue(instruction_data.value[13],instruction_data.value[14])
          break;

      }
    }

  }

  function ValidRegister(register: string): boolean {
    const registerRegex = /^\$R([0-9]|[1-2][0-9]|3[0-1])$/;

    return registerRegex.test(register);
  }

  function ValidData(data: string): boolean {
    const dataRegex = /^\$([0-9]|[1-9][0-9]|[1-4][0-9][0-9])$/;

    return dataRegex.test(data);
  }

  function ValidNumber(input: string): boolean {
    const numberRegex = /^\$([+-]?\d+)$/;

    return numberRegex.test(input);
  }

  function ValidInstructionNumber(input: string): boolean {
    if (!input.startsWith("$")) return false;

    const num = Number(input.slice(1));
    return !isNaN(num) && num >= 0 && num <= 299;
  }

  function ChangeColor() {
    if (step < 5) {
      // Gradually fill in colors from left to right
      for (let i = step; i > 0; i--) {
        colors.value[i] = colors.value[i - 1]; // Shift existing colors
      }
      colors.value[0] = colorList[step]; // Insert new color at the start
      step++;
    } else {
      // Rotate colors when fully filled
      const lastColor = colors.value.pop();
      colors.value.unshift(lastColor);
    }
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
    playfast,
    colors
  };
});
