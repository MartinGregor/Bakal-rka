<template>
  <div>
    <svg width="100%" height="650" viewBox="0 0 500 200">

      <!--Lines-->
      <!--Part-1-->

      <line x1="85" y1="85" x2="100" y2="85" :stroke="pathColor1" stroke-width="2"/>
      <line x1="50" y1="120" x2="75" y2="120" :stroke="pathColor1" stroke-width="2"/>
      <line x1="65" y1="120" x2="65" y2="65" :stroke="pathColor1" stroke-width="2"/>
      <line x1="65" y1="65" x2="100" y2="65" :stroke="pathColor1" stroke-width="2"/>
      <line x1="75" y1="120" x2="150" y2="120" :stroke="pathColor1" stroke-width="2"/>

      <circle cx="65" cy="120" r="2" :fill="pathColor1"/>
      <circle cx="135" cy="75" r="2" :fill="pathColor1"/>

      <line x1="135" y1="75" x2="135" y2="5" :stroke="pathColor1" stroke-width="2"/>
      <line x1="135" y1="5" x2="400" y2="5" :stroke="pathColor1" stroke-width="2"/>
      <line x1="100" y1="75" x2="135" y2="75" :stroke="pathColor1" stroke-width="2"/>
      <line x1="135" y1="75" x2="150" y2="75" :stroke="pathColor1" stroke-width="2"/>

      <line x1="410" y1="9.5" x2="425" y2="9.5" :stroke="pathColor1" stroke-width="2"/>
      <line x1="425" y1="9.5" x2="425" y2="-15" :stroke="pathColor1" stroke-width="2"/>
      <line x1="425" y1="-15" x2="25" y2="-15" :stroke="pathColor1" stroke-width="2"/>
      <line x1="425" y1="-15" x2="25" y2="-15" :stroke="pathColor1" stroke-width="2"/>
      <line x1="25" y1="-15" x2="25" y2="120" :stroke="pathColor1" stroke-width="2"/>
      <line x1="25" y1="120" x2="50" y2="120" :stroke="pathColor1" stroke-width="2"/>

      <!--Part-2-->

      <line x1="150" y1="120" x2="162.5" y2="120" :stroke="pathColor2" stroke-width="2"/>
      <line x1="162.5" y1="135" x2="175" y2="135" :stroke="pathColor2" stroke-width="2"/>
      <line x1="162.5" y1="105" x2="175" y2="105" :stroke="pathColor2" stroke-width="2"/>

      <line x1="180" y1="135" x2="250" y2="135" :stroke="pathColor2" stroke-width="2"/>
      <line x1="180" y1="105" x2="250" y2="105" :stroke="pathColor2" stroke-width="2"/>

      <line x1="162.5" y1="120" x2="162.5" y2="40" :stroke="pathColor2" stroke-width="2"/>
      <line x1="162.5" y1="120" x2="162.5" y2="200" :stroke="pathColor2" stroke-width="2"/>

      <line x1="150" y1="75" x2="250" y2="75" :stroke="pathColor2" stroke-width="2"/>
      <line x1="162.5" y1="40" x2="190" y2="40" :stroke="pathColor2" stroke-width="2"/>
      <line x1="190" y1="40" x2="225" y2="40" :stroke="pathColor2" stroke-width="2"/>
      <line x1="215" y1="30" x2="225" y2="30" :stroke="pathColor2" stroke-width="2"/>
      <line x1="225" y1="35" x2="250" y2="35" :stroke="pathColor2" stroke-width="2"/>

      <line x1="162.5" y1="200" x2="250" y2="200" :stroke="pathColor2" stroke-width="2"/>
      <line x1="162.5" y1="189" x2="250" y2="189" :stroke="pathColor2" stroke-width="2"/>
      <circle cx="162.5" cy="189" r="2" :fill="pathColor2"/>

      <line x1="162.5" y1="175" x2="200" y2="175" :stroke="pathColor2" stroke-width="2"/>
      <circle cx="162.5" cy="175" r="2" :fill="pathColor2"/>
      <line x1="175" y1="175" x2="250" y2="175" :stroke="pathColor2" stroke-width="2"/>

      <circle cx="162.5" cy="135" r="2" :fill="pathColor2"/>
      <circle cx="162.5" cy="105" r="2" :fill="pathColor2"/>
      <circle cx="162.5" cy="120" r="2" :fill="pathColor2"/>

      <!--Part-3-->
      <line x1="250" y1="200" x2="270" y2="200" :stroke="pathColor3" stroke-width="2"/>
      <line x1="250" y1="189" x2="270" y2="189" :stroke="pathColor3" stroke-width="2"/>

      <!--Part-4-->


      <!--Objects-->
      <!--Part-1-->
      <rect x="75" y="100" width="50" height="40" fill="grey" rx="5" ry="5"/>
      <text x="100" y="120" font-size="8" font-family="Helvetica" fill="white" text-anchor="middle">Instructions</text>

      <polygon points="100,60 100,90 120,75" fill="#2196F3" stroke-linejoin="round" stroke="#2196F3" stroke-width="5"/>
      <text x="110" y="80" font-size="12" font-family="Arial" fill="white" text-anchor="middle">+</text>
      <text x="80" y="88" font-size="8" font-family="Arial" fill="grey" text-anchor="middle" >4</text>

      <line x1="50" y1="20" x2="50" y2="200" stroke="#1976D2" stroke-width="10" stroke-linecap="round"/>
      <line x1="150" y1="20" x2="150" y2="200" stroke="#1976D2" stroke-width="10" stroke-linecap="round"/>
      <line x1="250" y1="20" x2="250" y2="200" stroke="#1976D2" stroke-width="10" stroke-linecap="round"/>
      <line x1="350" y1="20" x2="350" y2="200" stroke="#1976D2" stroke-width="10" stroke-linecap="round"/>
      <line x1="450" y1="20" x2="450" y2="200" stroke="#1976D2" stroke-width="10" stroke-linecap="round"/>

      <!--Part-2-->
      <rect x="225" y="23" width="10" height="25" fill="pink" rx="5" ry="5"/>
      <rect x="180" y="20" width="20" height="40" fill="grey" rx="20" ry="20"/>
      <text x="190" y="40" font-size="8" font-family="Arial" fill="white" text-anchor="middle" >CU</text>

      <rect x="175" y="80" width="50" height="80" fill="grey" rx="5" ry="5"/>
      <text x="200" y="120" font-size="8" font-family="Helvetica" fill="white" text-anchor="middle">Registers</text>
      <text x="210" y="32" font-size="8" font-family="Arial" fill="grey" text-anchor="middle" >0</text>


      <!--Part-3-->
      <rect x="325" y="30" width="10" height="25" fill="pink" rx="5" ry="5"/>
      <rect x="265" y="182" width="10" height="25" fill="pink" rx="5" ry="5"/>
      <rect x="200" y="165" width="10" height="20" fill="grey" rx="20" ry="20"/>

      <polygon points="315,105 315,135 335,120" fill="#2196F3" stroke-linejoin="round" stroke="#2196F3" stroke-width="5"/>
      <text x="323" y="123" font-size="8" font-family="Arial" fill="white" text-anchor="middle">ALU</text>

      <!--Part-4-->
      <rect x="400" y="-3" width="10" height="25" fill="pink" rx="5" ry="5"/>

      <rect x="375" y="100" width="50" height="40" fill="grey" rx="5" ry="5"/>
      <text x="400" y="120" font-size="8" font-family="Helvetica" fill="white" text-anchor="middle">Memory</text>

    </svg>
    <button @click="changeColor" style="margin-top: 20px; padding: 10px; background-color: #1976D2; color: white; border: none; border-radius: 5px;">Change Color</button>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useProgramManagementStore } from "stores/program_management";

export default defineComponent({
  name: "IIEMWComponent",

  setup() {
    const store = useProgramManagementStore();
    const pathColorDefault = ref("grey");
    const pathColor1 = ref("#1976D2");
    const pathColor2 = ref("green");
    const pathColor3 = ref("orange");

    const changeColor = () => {
      pathColor1.value = pathColor1.value === "#1976D2" ? "red" : "#1976D2";
    };

    return {
      store,
      changeColor,
      pathColorDefault,
      pathColor1,
      pathColor2,
      pathColor3
    };
  },
});
</script>

<style scoped>

</style>
