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
                propsTable += `<tr><td>${key}</td><td>${value}</td></tr>`
            }
            propsTable += "</table>"
            return propsTable
        }
        /*
        <table>
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
</table>
        */
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
</style>