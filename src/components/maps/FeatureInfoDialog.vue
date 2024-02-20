<script lang="ts">
import { useGlobalStore } from "@/stores/GlobalStore"
import { LGeoJson, LTileLayer, LMap, LControl } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
export default {
    components: {
        LMap,
        LTileLayer,
        LGeoJson
    },
    props: {
        isFeatureInfoDialogOpen: Boolean
        // closeFeatureInfoDialog: Function
    },
    data () {
        return {
            isDialogOpen: false,
            globalStore: useGlobalStore(),
            zoom: 4
            // notifications: false,
            // sound: true,
            // widgets: false,
        }
    },
    watch: {
        'isFeatureInfoDialogOpen': function() {
            if(this.isFeatureInfoDialogOpen) {
                this.isDialogOpen = true
            } else {
                this.isDialogOpen = false
            }
        }
    },
    methods: {
        closeDialog() {
            this.$emit('closeFeatureInfoDialog')
            // props.closeFeatureInfoDialog()
        }
    }
  }
</script>
<template>
    <v-row justify="center">
        <v-dialog   v-model="isDialogOpen"
                    fullscreen
                    :scrim="false"
                    transition="dialog-bottom-transition"
        >
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Linked Features Info</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    </v-toolbar-items>
                </v-toolbar>
                <v-divider></v-divider>
                <!-- <v-container class="bg-surface-variant"> -->
                    <v-row no-gutters>
                        <v-col cols="4">
                            <div class="mapContainer">
                                <LMap ref="map" :use-global-leaflet="false" v-model:zoom="zoom" :center="[-15.83, -55.86]">
                                    <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                layer-type="base"
                                                name="OpenStreetMap">
                                    </LTileLayer>
                                    <LGeoJson :key="feature.id" v-for="feature in globalStore.currentLayer['features']" :geojson="feature" ></LGeoJson>                 
                                </LMap>
                            </div>
                        </v-col>
                        <v-col>
                            <div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Head 1</th>
                                            <th>Head 2</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Body 1</td>
                                            <td>Body 2</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </v-col>
                    </v-row>
                <!-- </v-container> -->
            </v-card>
        </v-dialog>
    </v-row>
</template>
<style>
.mapContainer {
    height: 95vh;
}

.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
    transition: transform .2s ease-in-out;
}
</style>