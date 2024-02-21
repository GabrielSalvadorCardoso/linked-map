<script lang="ts">
import { useGlobalStore } from "@/stores/GlobalStore"
import { LGeoJson, LTileLayer, LMap, LControl } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import { VDataTable } from 'vuetify/labs/VDataTable'
export default {
    components: {
        LMap,
        LTileLayer,
        LGeoJson,
        VDataTable
    },
    props: {
        isFeatureInfoDialogOpen: Boolean
        // closeFeatureInfoDialog: Function
    },
    data () {
        return {
            isDialogOpen: false,
            globalStore: useGlobalStore(),
            zoom: 4,
            expanded: [],
            dessertHeaders: [
            {
                title: 'Dessert (100g serving)',
                align: 'start',
                sortable: false,
                key: 'name',
            },
            { title: 'Calories', key: 'calories' },
            { title: 'Fat (g)', key: 'fat' },
            { title: 'Carbs (g)', key: 'carbs' },
            { title: 'Protein (g)', key: 'protein' },
            { title: 'Iron (%)', key: 'iron' },
            { title: '', key: 'data-table-expand' },
            ],
            desserts: [
            {
                name: 'Frozen Yogurt',
                calories: 159,
                fat: 6.0,
                carbs: 24,
                protein: 4.0,
                iron: 1,
            },
            {
                name: 'Ice cream sandwich',
                calories: 237,
                fat: 9.0,
                carbs: 37,
                protein: 4.3,
                iron: 1,
            },
            {
                name: 'Eclair',
                calories: 262,
                fat: 16.0,
                carbs: 23,
                protein: 6.0,
                iron: 7,
            },
            {
                name: 'Cupcake',
                calories: 305,
                fat: 3.7,
                carbs: 67,
                protein: 4.3,
                iron: 8,
            },
            {
                name: 'Gingerbread',
                calories: 356,
                fat: 16.0,
                carbs: 49,
                protein: 3.9,
                iron: 16,
            },
            {
                name: 'Jelly bean',
                calories: 375,
                fat: 0.0,
                carbs: 94,
                protein: 0.0,
                iron: 0,
            },
            {
                name: 'Lollipop',
                calories: 392,
                fat: 0.2,
                carbs: 98,
                protein: 0,
                iron: 2,
            },
            {
                name: 'Honeycomb',
                calories: 408,
                fat: 3.2,
                carbs: 87,
                protein: 6.5,
                iron: 45,
            },
            {
                name: 'Donut',
                calories: 452,
                fat: 25.0,
                carbs: 51,
                protein: 4.9,
                iron: 22,
            },
            {
                name: 'KitKat',
                calories: 518,
                fat: 26.0,
                carbs: 65,
                protein: 7,
                iron: 6,
            },
            ],
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
        },
        getPrimaryFeatureProperties(properties:any) {
            let primaryProperties:any = {}
            for(const [key, value] of Object.entries(properties)) {
                if(typeof value !== "object") {
                    primaryProperties[key] = value
                }
            }
            return [primaryProperties]
        },
        getSecondaryFeatureProperties(properties:any) {
            let secondaryProperties:any = {}
            for(const [pKey, pValue] of Object.entries(properties)) {
                let secondaryKVPair:any = {}
                if(typeof pValue === "object") {                    
                    for(const [sKey, sValue] of Object.entries(pValue as any)) {
                        secondaryKVPair[sKey] = sValue
                    }
                    secondaryProperties[pKey] = secondaryKVPair
                }
            }
            return secondaryProperties
        },
        getAgreggatedFeatureProperties(properties:any) {
            let agreggatedProperties:string[] = []
            for(const [pKey, pValue] of Object.entries(properties)) {
                if(typeof pValue === "object") {                    
                    agreggatedProperties.push(pKey)
                }
            }
            return agreggatedProperties
        },
        getPrimaryFeaturePropertiesHeaders(properties:any) {
            let headers:any[] = []
            for(const [aKey, value] of Object.entries(properties)) {
                if(typeof value !== "object") {
                    headers.push({
                        key: aKey,
                        title: aKey
                    })
                }
            }
            return headers
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
                            <v-data-table
                                v-model:expanded="expanded"
                                :headers="getPrimaryFeaturePropertiesHeaders(globalStore.currentLayer['features'][0]['properties'])"
                                :items="getPrimaryFeatureProperties(globalStore.currentLayer['features'][0]['properties'])"
                                item-value="nome"
                                show-expand
                            >
                                <template v-slot:top>
                                    <v-toolbar flat>
                                        <v-toolbar-title>Expandable Table</v-toolbar-title>
                                    </v-toolbar>
                                </template>
                                <template v-slot:expanded-row="{ columns, item }">
                                    <tr>
                                        <td :colspan="columns.length">
                                            <table>
                                                <caption>Agraggated info about {{ item.nome }}</caption>
                                                <thead>
                                                    <tr>
                                                        <th v-for="link in getAgreggatedFeatureProperties(globalStore.currentLayer['features'][0]['properties'])" :key="link">{{ link }}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td class="btnContainer" v-for="link in getAgreggatedFeatureProperties(globalStore.currentLayer['features'][0]['properties'])" :key="link">
                                                            <v-btn class="openAggregatedTableBtn" @click="() => console.log(`${link}`)">Open agregated table</v-btn>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </template>
                            </v-data-table>
                        </v-col>
                    </v-row>
                    <!-- <pre>
                        {{ getSecondaryFeatureProperties(globalStore.currentLayer['features'][0]["properties"]) }}
                    </pre> -->
                <!-- </v-container> -->
            </v-card>
        </v-dialog>
    </v-row>
</template>
<style>
.mapContainer {
    height: 95vh;
}
.openAggregatedTableBtn {
    margin: 10;
}

.btnContainer {
    /* display: flex; */
    /* justify-content: center; */
    /* flex-direction: row; */
    /* align-items: center; */
    text-align: center;
}

.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
    transition: transform .2s ease-in-out;
}
</style>