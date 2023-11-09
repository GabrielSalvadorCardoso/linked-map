<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LGeoJson, LPopup } from "@vue-leaflet/vue-leaflet";
import FeatureRender from './FeatureRender.vue';

export default {
    // declaração de componentes que serão usados no componente TemplateMap
    components: {
        LMap,
        LTileLayer,
        FeatureRender
        // LGeoJson,
        // LPopup
    },
    data() {
        return {
            zoom: 4,
            geojson: []
        };
    },
    methods: {
        async requestData() {
            event.preventDefault()
            // const response = await fetch("http://bcim.geoapi/lim-unidade-federacao-a-list")
            const response = await fetch("http://bcim.geoapi/lim-municipio-a-list")
            const json = await response.json()
            this.geojson = json
        }
    }
};

</script>
<template>
    <div class="mapContainer">
        <LMap ref="map" :use-global-leaflet="false" v-model:zoom="zoom" :center="[-15.83, -47.86]">
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        layer-type="base"
                        name="OpenStreetMap">
            </LTileLayer>
            
            
            <FeatureRender  v-for="(feature, index) in geojson['features']"
                            :key="feature.id"
                            :geojson="geojson['features'][index]" />
            
            
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