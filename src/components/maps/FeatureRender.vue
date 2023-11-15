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
    methods: {
        formatProperties(properties) {
            let propsTable = "<table>"

            for(let i=0; i<Object.entries(properties).length; i++) {                
                let key = Object.entries(properties)[i][0]
                let value = Object.entries(properties)[i][1]

                if(typeof value === "object") {
                  let nestedTable = "<table>"
                  let nestedTableRows = Object.entries(value).map((entry) => {
                      return `<tr><td>${entry[0]}</td><td>${entry[1]}</td></tr>`
                  }).join("")
                  nestedTable += `${nestedTableRows}</table>`
                  propsTable += `<tr><td>${key}</td><td>${nestedTable}</td></tr>`

                } else {
                    propsTable += `<tr><td>${key}</td><td>${value}</td></tr>`
                }
            }

            propsTable += "</table>"
            return propsTable
        }
    }
}

</script>

<template>
    <LGeoJson :geojson="geojson" >
        <l-popup :content="formatProperties(geojson['properties'])" />
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