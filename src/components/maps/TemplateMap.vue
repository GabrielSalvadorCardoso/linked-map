<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import FeatureRender from './FeatureRender.vue';
// import GridLayer from './GridLayer.vue'
// @ts-ignore
import { useGlobalStore } from "@/stores/GlobalStore";
export default {
    // declaração de componentes que serão usados no componente TemplateMap
    components: {
        LMap,
        LTileLayer,
        FeatureRender,
        // LGridLayer
        // LGeoJson,
        // LPopup
    },
    data() {
        return {
            zoom: 4,
            geojson: [],
            // tileComponent: {
            //     name: 'tile-component',
            //     props: {
            //         coords: {
            //             type: Object,
            //             required: true
            //         }
            //     },
            //     template: '<div>Coords: {{coords.x}}, {{coords.y}}</div>'
            // },
            globalStore: useGlobalStore(),
        };
    },
    methods: {
    }
};

</script>
<template>
    <div class="mapContainer">
        <LMap ref="map" :use-global-leaflet="false" v-model:zoom="zoom" :center="[-15.83, -55.86]">
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        layer-type="base"
                        name="OpenStreetMap">
            </LTileLayer>
            <!-- <l-grid-layer :tile-component="tileComponent"></l-grid-layer> -->
            
            <div v-if="globalStore.currentLayer !== null">
                <FeatureRender  v-for="feature in globalStore.currentLayer['features']"
                                
                                :key="feature.id"
                                :geojson="feature" />
            </div>
            
        </LMap>
    </div>
    <!-- <button v-on:click="requestData()">Request Data</button> -->
</template>
<style>
.mapContainer {
    height: 100vh;
    /* width: 100%; */
    margin: 10px 255px;
}
</style>