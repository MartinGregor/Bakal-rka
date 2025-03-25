<template>
  <div>
    <svg width="100%" height="650" viewBox="0 0 500 200">

      <!--Lines-->
      <!--Part-1-->

      <line x1="85" y1="85" x2="100" y2="85" :stroke="pathColor1" stroke-width="2"/>
      <line x1="49.5" y1="120" x2="75" y2="120" :stroke="pathColor1" stroke-width="2"/>
      <line x1="65" y1="120" x2="65" y2="64" :stroke="pathColor1" stroke-width="2"/>
      <line x1="65" y1="65" x2="100" y2="65" :stroke="pathColor1" stroke-width="2"/>
      <line x1="75" y1="120" x2="150" y2="120" :stroke="pathColor1" stroke-width="2"/>
      <circle cx="65" cy="120" r="2" :fill="pathColor1"/>
      <circle cx="135" cy="75" r="2" :fill="pathColor1"/>
      <line x1="135" y1="75" x2="135" y2="4" :stroke="pathColor1" stroke-width="2"/>
      <line x1="135" y1="5" x2="400" y2="5" :stroke="pathColor1" stroke-width="2"/>
      <line x1="100" y1="75" x2="135" y2="75" :stroke="pathColor1" stroke-width="2"/>
      <line x1="135" y1="75" x2="150" y2="75" :stroke="pathColor1" stroke-width="2"/>
      <line x1="410" y1="9.5" x2="425" y2="9.5" :stroke="pathColor1" stroke-width="2"/>
      <line x1="425" y1="10.5" x2="425" y2="-15" :stroke="pathColor1" stroke-width="2"/>
      <line x1="426" y1="-15" x2="34" y2="-15" :stroke="pathColor1" stroke-width="2"/>
      <line x1="35" y1="-15" x2="35" y2="120" :stroke="pathColor1" stroke-width="2"/>
      <line x1="34" y1="120" x2="50" y2="120" :stroke="pathColor1" stroke-width="2"/>

      <!--Part-2-->

      <line x1="150" y1="120" x2="162.5" y2="120" :stroke="pathColor2" stroke-width="2"/>
      <line x1="162.5" y1="135" x2="175" y2="135" :stroke="pathColor2" stroke-width="2"/>
      <line x1="162.5" y1="105" x2="175" y2="105" :stroke="pathColor2" stroke-width="2"/>
      <line x1="180" y1="135" x2="250" y2="135" :stroke="pathColor2" stroke-width="2"/>
      <line x1="180" y1="105" x2="250" y2="105" :stroke="pathColor2" stroke-width="2"/>
      <line x1="162.5" y1="120" x2="162.5" y2="40" :stroke="pathColor2" stroke-width="2"/>
      <line x1="162.5" y1="120" x2="162.5" y2="200" :stroke="pathColor2" stroke-width="2"/>
      <line x1="150" y1="75" x2="250" y2="75" :stroke="pathColor2" stroke-width="2"/>
      <line x1="161.5" y1="40" x2="190" y2="40" :stroke="pathColor2" stroke-width="2"/>
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
      <line x1="250" y1="200" x2="260" y2="200" :stroke="pathColor3" stroke-width="2"/>
      <line x1="250" y1="189" x2="260" y2="189" :stroke="pathColor3" stroke-width="2"/>
      <line x1="260" y1="194.5" x2="350" y2="194.5" :stroke="pathColor3" stroke-width="2"/>
      <line x1="250" y1="175" x2="271" y2="175" :stroke="pathColor3" stroke-width="2"/>
      <line x1="270" y1="175" x2="270" y2="145" :stroke="pathColor3" stroke-width="2"/>
      <line x1="270" y1="145" x2="285" y2="145" :stroke="pathColor3" stroke-width="2"/>
      <circle cx="270" cy="145" r="2" :fill="pathColor3"/>
      <line x1="270" y1="145" x2="270" y2="69" :stroke="pathColor3" stroke-width="2"/>
      <line x1="270" y1="70" x2="290" y2="70" :stroke="pathColor3" stroke-width="2"/>
      <line x1="250" y1="35" x2="330" y2="35" :stroke="pathColor3" stroke-width="2"/>
      <line x1="250" y1="35" x2="330" y2="35" :stroke="pathColor3" stroke-width="2"/>
      <line x1="285" y1="35" x2="285" y2="150" :stroke="pathColor3" stroke-width="1"/>
      <line x1="262" y1="35" x2="262" y2="190" :stroke="pathColor3" stroke-width="1"/>
      <circle cx="285" cy="35" r="2" :fill="pathColor3"/>
      <circle cx="262" cy="35" r="2" :fill="pathColor3"/>
      <circle cx="320" cy="35" r="2" :fill="pathColor3"/>
      <line x1="320" y1="35" x2="320" y2="130" :stroke="pathColor3" stroke-width="2"/>
      <line x1="280" y1="138" x2="310" y2="138" :stroke="pathColor3" stroke-width="2"/>
      <line x1="250" y1="105" x2="310" y2="105" :stroke="pathColor3" stroke-width="2"/>
      <line x1="250" y1="135" x2="285" y2="135" :stroke="pathColor3" stroke-width="2"/>
      <line x1="277" y1="135" x2="277" y2="166" :stroke="pathColor3" stroke-width="2"/>
      <line x1="277" y1="165" x2="350" y2="165" :stroke="pathColor3" stroke-width="2"/>
      <line x1="250" y1="75" x2="278" y2="75" :stroke="pathColor3" stroke-width="2"/>
      <line x1="277" y1="75" x2="277" y2="49" :stroke="pathColor3" stroke-width="2"/>
      <line x1="277" y1="50" x2="295" y2="50" :stroke="pathColor3" stroke-width="2"/>
      <line x1="315" y1="45" x2="330" y2="45" :stroke="pathColor3" stroke-width="2"/>
      <line x1="330" y1="40" x2="350" y2="40" :stroke="pathColor3" stroke-width="2"/>
      <line x1="300" y1="60" x2="350" y2="60" :stroke="pathColor3" stroke-width="2"/>
      <line x1="310" y1="120" x2="350" y2="120" :stroke="pathColor3" stroke-width="2"/>
      <line x1="350" y1="85" x2="329.5" y2="85" :stroke="pathColor3" stroke-width="1"/>
      <line x1="330" y1="85" x2="330" y2="120" :stroke="pathColor3" stroke-width="1"/>

      <!--Part-4-->

      <line x1="350" y1="194.5" x2="450" y2="194.5" :stroke="pathColor4" stroke-width="2"/>
      <line x1="350" y1="40" x2="450" y2="40" :stroke="pathColor4" stroke-width="2"/>
      <line x1="350" y1="60" x2="366" y2="60" :stroke="pathColor4" stroke-width="2"/>
      <line x1="365" y1="60" x2="365" y2="14" :stroke="pathColor4" stroke-width="2"/>
      <line x1="365" y1="15" x2="405" y2="15" :stroke="pathColor4" stroke-width="2"/>
      <line x1="405" y1="15" x2="405" y2="25.5" :stroke="pathColor4" stroke-width="1"/>
      <line x1="390" y1="25" x2="405" y2="25" :stroke="pathColor4" stroke-width="1"/>
      <circle cx="390" cy="25" r="2" :fill="pathColor4"/>
      <line x1="390" y1="9.5" x2="390" y2="25" :stroke="pathColor4" stroke-width="1"/>
      <line x1="335" y1="10" x2="390" y2="10" :stroke="pathColor4" stroke-width="1"/>
      <circle cx="335" cy="10" r="2" :fill="pathColor4"/>
      <line x1="335" y1="10" x2="335" y2="30" :stroke="pathColor4" stroke-width="1"/>
      <line x1="149.5" y1="10" x2="335" y2="10" :stroke="pathColor4" stroke-width="1"/>
      <circle cx="230" cy="10" r="2" :fill="pathColor4"/>
      <line x1="230" y1="10" x2="230" y2="30" :stroke="pathColor4" stroke-width="1"/>
      <line x1="150" y1="10" x2="150" y2="30" :stroke="pathColor4" stroke-width="1"/>
      <line x1="390" y1="63" x2="390" y2="25" :stroke="pathColor4" stroke-width="1"/>
      <line x1="390.5" y1="63" x2="375" y2="63" :stroke="pathColor4" stroke-width="1"/>
      <line x1="379" y1="65" x2="379" y2="40" :stroke="pathColor4" stroke-width="1"/>
      <circle cx="379" cy="40" r="2" :fill="pathColor4"/>
      <line x1="400" y1="110" x2="400" y2="40" :stroke="pathColor4" stroke-width="1"/>
      <circle cx="400" cy="40" r="2" :fill="pathColor4"/>
      <line x1="435" y1="150.5" x2="435" y2="40" :stroke="pathColor4" stroke-width="1"/>
      <circle cx="435" cy="40" r="2" :fill="pathColor4"/>
      <line x1="435" y1="150" x2="399.5" y2="150" :stroke="pathColor4" stroke-width="1"/>
      <line x1="400" y1="140" x2="400" y2="150" :stroke="pathColor4" stroke-width="1"/>
      <line x1="379" y1="70" x2="379" y2="85.5" :stroke="pathColor4" stroke-width="1"/>
      <line x1="350" y1="85" x2="379" y2="85" :stroke="pathColor4" stroke-width="1"/>
      <line x1="400" y1="120" x2="450" y2="120" :stroke="pathColor4" stroke-width="2"/>
      <line x1="350" y1="165" x2="386" y2="165" :stroke="pathColor4" stroke-width="2"/>
      <line x1="385" y1="130" x2="385" y2="165" :stroke="pathColor4" stroke-width="2"/>
      <line x1="350" y1="120" x2="365" y2="120" :stroke="pathColor4" stroke-width="2"/>
      <circle cx="365" cy="120" r="2" :fill="pathColor4"/>
      <circle cx="365" cy="130" r="2" :fill="pathColor4"/>
      <line x1="365" y1="109" x2="365" y2="120" :stroke="pathColor4" stroke-width="2"/>
      <line x1="365" y1="110" x2="390" y2="110" :stroke="pathColor4" stroke-width="2"/>
      <line x1="365" y1="130" x2="390" y2="130" :stroke="pathColor4" stroke-width="2"/>
      <line x1="365" y1="130" x2="365" y2="120" :stroke="pathColor4" stroke-width="2"/>
      <line x1="365" y1="130" x2="365" y2="156" :stroke="pathColor4" stroke-width="2"/>
      <line x1="365" y1="155" x2="450" y2="155" :stroke="pathColor4" stroke-width="2"/>


      <!--Part-5-->

      <line x1="450" y1="194.5" x2="461" y2="194.5" :stroke="pathColor5" stroke-width="2"/>
      <line x1="460" y1="194.5" x2="460" y2="215" :stroke="pathColor5" stroke-width="2"/>
      <line x1="461" y1="215" x2="215" y2="215" :stroke="pathColor5" stroke-width="2"/>
      <line x1="215" y1="150" x2="215" y2="216" :stroke="pathColor5" stroke-width="2"/>
      <line x1="450" y1="155" x2="460" y2="155" :stroke="pathColor5" stroke-width="2"/>
      <line x1="460" y1="156" x2="460" y2="134" :stroke="pathColor5" stroke-width="2"/>
      <line x1="460" y1="135" x2="470" y2="135" :stroke="pathColor5" stroke-width="2"/>
      <line x1="450" y1="120" x2="470" y2="120" :stroke="pathColor5" stroke-width="2"/>
      <line x1="470" y1="127.5" x2="481" y2="127.5" :stroke="pathColor5" stroke-width="2"/>
      <line x1="480" y1="127.5" x2="480" y2="225" :stroke="pathColor5" stroke-width="2"/>
      <line x1="185" y1="225" x2="481" y2="225" :stroke="pathColor5" stroke-width="2"/>
      <line x1="185" y1="226" x2="185" y2="160" :stroke="pathColor5" stroke-width="2"/>
      <line x1="450" y1="40" x2="470" y2="40" :stroke="pathColor5" stroke-width="2"/>
      <circle cx="470" cy="40" r="2" :fill="pathColor5"/>
      <line x1="470" y1="40" x2="470" y2="135" :stroke="pathColor5" stroke-width="1"/>
      <line x1="470" y1="40" x2="470" y2="-5" :stroke="pathColor5" stroke-width="1"/>
      <line x1="470.5" y1="-5" x2="200" y2="-5" :stroke="pathColor5" stroke-width="1"/>
      <line x1="200" y1="-5.5" x2="200" y2="80" :stroke="pathColor5" stroke-width="1"/>

      <!--Objects-->
      <!--Part-1-->
      <rect x="75" y="100" width="50" height="40" fill="grey" rx="5" ry="5"/>
      <text x="100" y="120" font-size="8" font-family="Helvetica" fill="white" text-anchor="middle">Instructions</text>
      <polygon points="100,60 100,90 120,75" fill="#2196F3" stroke-linejoin="round" stroke="#2196F3" stroke-width="5"/>
      <text x="107.5" y="79.5" font-size="12" font-family="Arial" fill="white" text-anchor="middle">+</text>
      <text x="80" y="87" font-size="8" font-family="Arial" fill="grey" text-anchor="middle" >4</text>

      <!--Part-2-->
      <rect x="225" y="23" width="10" height="25" fill="pink" rx="5" ry="5"/>
      <rect x="170" y="20" width="20" height="40" fill="grey" rx="20" ry="20"/>
      <text x="180" y="40" font-size="8" font-family="Arial" fill="white" text-anchor="middle" >CU</text>
      <rect x="175" y="80" width="50" height="80" fill="grey" rx="5" ry="5"/>
      <text x="200" y="120" font-size="8" font-family="Helvetica" fill="white" text-anchor="middle">Registers</text>
      <text x="210" y="32" font-size="8" font-family="Arial" fill="grey" text-anchor="middle" >0</text>
      <rect x="230" y="165" width="10" height="20" fill="grey" rx="20" ry="20"/>


      <!--Part-3-->
      <rect x="330" y="28" width="10" height="25" fill="pink" rx="5" ry="5"/>
      <rect x="257.5" y="182" width="10" height="25" fill="pink" rx="5" ry="5"/>
      <rect x="280" y="125" width="10" height="25" fill="pink" rx="5" ry="5"/>
      <polygon points="290,45 290,75 310,60" fill="#2196F3" stroke-linejoin="round" stroke="#2196F3" stroke-width="5"/>
      <text x="297" y="63.5" font-size="12" font-family="Arial" fill="white" text-anchor="middle">+</text>
      <polygon points="305,100 305,140 335,120" fill="purple" stroke-linejoin="round" stroke="purple" stroke-width="5"/>
      <text x="316" y="123" font-size="8" font-family="Arial" fill="white" text-anchor="middle">ALU</text>
      <text x="310" y="47" font-size="8" font-family="Arial" fill="grey" text-anchor="middle" >0</text>

      <!--Part-4-->
      <rect x="400" y="-3" width="10" height="25" fill="pink" rx="5" ry="5"/>
      <rect x="375" y="100" width="50" height="40" fill="grey" rx="5" ry="5"/>
      <text x="400" y="120" font-size="8" font-family="Helvetica" fill="white" text-anchor="middle">Memory</text>
      <rect x="375" y="55" width="8" height="15" fill="pink" rx="2" ry="2"/>

      <!--Part-5-->

      <rect x="465" y="115" width="10" height="25" fill="pink" rx="5" ry="5"/>

      <!--5rows-->

      <line x1="50" y1="20" x2="50" y2="200" stroke="#1976D2" stroke-width="10" stroke-linecap="round"/>
      <line x1="150" y1="20" x2="150" y2="200" stroke="#1976D2" stroke-width="10" stroke-linecap="round"/>
      <line x1="250" y1="20" x2="250" y2="200" stroke="#1976D2" stroke-width="10" stroke-linecap="round"/>
      <line x1="350" y1="20" x2="350" y2="200" stroke="#1976D2" stroke-width="10" stroke-linecap="round"/>
      <line x1="450" y1="20" x2="450" y2="200" stroke="#1976D2" stroke-width="10" stroke-linecap="round"/>

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
    const pathColor1 = ref("Chartreuse");
    const pathColor2 = ref("Magenta");
    const pathColor3 = ref("Coral");
    const pathColor4 = ref("Violet");
    const pathColor5 = ref("Indigo");


    const changeColor = () => {
      pathColor1.value = pathColor1.value === "#1976D2" ? "red" : "#1976D2";
    };

    return {
      store,
      changeColor,
      pathColorDefault,
      pathColor1,
      pathColor2,
      pathColor3,
      pathColor4,
      pathColor5
    };
  },
});
</script>

<style scoped>

</style>
