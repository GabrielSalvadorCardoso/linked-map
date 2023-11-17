<script>
import { LGeoJson, LPopup } from "@vue-leaflet/vue-leaflet";
export default {
    components: {
        LGeoJson,
        LPopup
    },
    props: {
        geojson: Object,
        // properties: Object
    },
    data() {
        return {
            nestedTablesState: {

            }
        };
    },
    methods: {
      isObject(value) {
          return typeof value === "object"
      },
      toggleNestadTable(nestedTableId) {
          if(Object.keys(this.nestedTablesState).includes(nestedTableId)) {
              if(this.nestedTablesState[nestedTableId]) {
                  this.nestedTablesState[nestedTableId] = false
              } else {
                  this.nestedTablesState[nestedTableId] = true
              }
          } else {
              this.nestedTablesState[nestedTableId] = true
          }
      }
        // formatProperties(properties) {
        //     return (
        //         <table>
        //             <tr>
        //                 <td>Key</td>
        //                 <td>Value</td>
        //             </tr>
        //         </table>
        //     )
        // },
        // formatProperties(properties) {
        //     let propsTable = "<table>"

        //     for(let i=0; i<Object.entries(properties).length; i++) {                
        //         let key = Object.entries(properties)[i][0]
        //         let value = Object.entries(properties)[i][1]

        //         if(typeof value === "object") {
        //           let nestedTable = "<table id='nested-table'>"
        //           let nestedTableRows = Object.entries(value).map((entry) => {
        //               return `<tr><td>${entry[0]}</td><td>${entry[1]}</td></tr>`
        //           }).join("")
        //           nestedTable += `${nestedTableRows}</table>`
        //           /*
        //           <button onclick="
        //           (
        //             function(){
        //                 let el = document.getElementById('demo');
        //                   if(el.style.display === 'none') {
        //                     el.style.display = 'block'
        //                   } else if(el.style.display === '' || el.style.display === 'block') {
        //                     el.style.display = 'none'
        //                   }
        //                 console.log(document.getElementById('demo').style.display)
        //             }
        //           )();return false;">Click me</button>
        //           */
        //           propsTable += `<tr><td><button onclick="
        //           (
        //             function(){
        //                 let el = document.getElementById('nested-table');
        //                 alert("Click!");
        //                 console.log(el.style);
                        
        //                 if(el.style.display === 'none') {
        //                   el.style.display = 'block';
        //                 } else if(el.style.display === '' || el.style.display === 'block') {
        //                   el.style.display = 'none';
        //                 }
        //             }
        //           )();return false;">${key}</button></td><td>${nestedTable}</td></tr>`

        //         } else {
        //             propsTable += `<tr><td>${key}</td><td>${value}</td></tr>`
        //         }
        //     }

        //     propsTable += "</table>"
        //     return propsTable
        // }
    }
}

</script>

<template>
    <LGeoJson :geojson="geojson" >
        <l-popup>
          <!-- {{ formatProperties(geojson['properties']) }} -->
            <v-simple-table dense height="300px">
                <template v-slot:default>
                    <tr v-for="entry in Object.entries(geojson['properties'])" :key="entry[0]">
                        <td v-if="!isObject(entry[1])">{{entry[0]}}</td>

                        <td v-if="isObject(entry[1])" colspan="2">
                            <button v-on:click="toggleNestadTable(entry[0])">{{entry[0]}}</button>
                        </td>

                        <td v-if="!isObject(entry[1])">
                            {{entry[1]}}
                        </td>

                        <td v-if="isObject(entry[1])">
                            <v-simple-table dense v-if="Object.keys(this.nestedTablesState).includes(entry[0]) && this.nestedTablesState[entry[0]]">
                                <tr v-for="nestedValue in Object.entries(entry[1])" :key="nestedValue[0]">
                                    <td>{{nestedValue[0]}}</td>
                                    <td>{{nestedValue[1]}}</td>
                                </tr>
                            </v-simple-table>
                        </td>
                    </tr>
                </template>
            </v-simple-table>
        </l-popup>
    </LGeoJson>
</template>

<style>
tr:nth-child(even) {
  background-color: #f2f2f2;
}
.leaflet-popup-content-wrapper {
  display: flex;
  justify-content: center;
}
.leaflet-popup-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto !important; /* Set width to auto */
  max-width: 100%; /* Ensure the content does not exceed the available width */
}
.leaflet-popup-content img {
  max-width: 40vw;
  max-height: 30vw;
  width: auto;
  height: auto;
}
 /* Style the button that is used to open and close the collapsible content */
 .collapsible {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
}

/* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
.active, .collapsible:hover {
  background-color: #ccc;
}

/* Style the collapsible content. Note: hidden by default */
.content {
  padding: 0 18px;
  display: none;
  overflow: hidden;
  background-color: #f1f1f1;
} 
table { 
	width: 750px; 
	border-collapse: collapse; 
	margin:50px auto;
	}

th { 
	background: #3498db; 
	color: white; 
	font-weight: bold; 
	}

td, th { 
	padding: 10px; 
	border: 1px solid #ccc; 
	text-align: left; 
	font-size: 18px;
	}

.labels tr td {
	background-color: #2cc16a;
	font-weight: bold;
	color: #fff;
}

.label tr td label {
	display: block;
}


[data-toggle="toggle"] {
	display: none;
}
</style>