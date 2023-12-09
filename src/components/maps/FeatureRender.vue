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
    }
}

</script>

<template>
    <LGeoJson :geojson="geojson" >
        <l-popup>
          <!-- {{ formatProperties(geojson['properties']) }} -->
            <v-table density="compact" height="500px">
                <template v-slot:default>
                    <tr dense v-for="entry in Object.entries(geojson['properties'])" :key="entry[0]">
                        <td v-if="!isObject(entry[1])">{{entry[0]}}</td>

                        <td v-if="isObject(entry[1])" colspan="2">
                            <button v-on:click="toggleNestadTable(entry[0])">{{entry[0]}}</button>
                        </td>

                        <td v-if="!isObject(entry[1])">
                            {{entry[1]}}
                        </td>

                        <td v-if="isObject(entry[1])">
                            <v-simple-table density="compact" v-if="Object.keys(this.nestedTablesState).includes(entry[0]) && this.nestedTablesState[entry[0]]">
                                <tr dense v-for="nestedValue in Object.entries(entry[1])" :key="nestedValue[0]">
                                    <td>{{nestedValue[0]}}</td>
                                    <td>{{nestedValue[1]}}</td>
                                </tr>
                            </v-simple-table>
                        </td>
                    </tr>
                </template>
            </v-table>
        </l-popup>
    </LGeoJson>
</template>

<style>
tr:nth-child(even) {
  background-color: #f2f2f2;
  border-color: #2cc16a;
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
	padding: 2px; 
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