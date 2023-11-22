<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
// @ts-ignore
import FeatureRender from './FeatureRender.vue';
// import GridLayer from './GridLayer.vue'
// @ts-ignore
import { useGlobalStore } from "@/stores/GlobalStore";
import { ref } from "vue";
const globalStore = useGlobalStore()
const zoom = ref(4)

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
    <!-- <div class="teste">{{contentMarginLeft}}</div> -->
    <!-- <div class="teste">{{isNavigationDrawerOpen}}</div> -->
    
    <!-- <button v-on:click="requestData()">Request Data</button> -->
</template>
<style>
/* .teste {
    text-align: center;
} */
.mapContainer {
    height: 95vh;
    /* width: 100%; */
    margin-left: v-bind('globalStore.mainContentMarginLeft');
    margin-right: v-bind('globalStore.mainContentMarginRight');
    /* margin: 10px 255px; */
}
</style>