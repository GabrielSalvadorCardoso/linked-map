<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LGeoJson } from "@vue-leaflet/vue-leaflet";

export default {
    components: {
        LMap,
        LTileLayer,
        LGeoJson
    },
    data() {
        return {
            zoom: 2,
            geojson: undefined
            // {
            //     "type": "Feature",
            //     "geometry": {
            //         "type": "Point",
            //         "coordinates": [125.6, 10.1]
            //     },
            //     "properties": {
            //         "name": "Dinagat Islands"
            //     }
            // }
        };
    },
    methods: {
        async requestData() {
            event.preventDefault()
            const response = await fetch("http://bcim.geoapi/lim-unidade-federacao-a-list")
            // const response = await fetch("http://bcim.geoapi/lim-municipio-a-list")
            const json = await response.json()
            this.geojson = json
        }
    }
};

</script>
<template>
    <div class="mapContainer">
        <LMap ref="map" v-model:zoom="zoom" :center="[47.41322, -1.219482]">
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        layer-type="base"
                        name="OpenStreetMap">
            </LTileLayer>
            <LGeoJson :geojson="geojson" ></LGeoJson>
        </LMap>
    </div>
    <button v-on:click="requestData()">Request Data</button>
</template>
<style>
.mapContainer {
    height:600px;
    width: 100%;
}
</style>