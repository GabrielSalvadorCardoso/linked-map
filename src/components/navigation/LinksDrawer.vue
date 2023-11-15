<script lang="ts">
// @ts-ignore
import { useGlobalStore } from "@/stores/GlobalStore";
// @ts-ignore
import { LinkinItem } from "@/stores/GlobalStore";
// @ts-ignore
import MergeDataDialog from "../maps/MergeDataDialog.vue";

const CONTENT_TYPE_GEOJSON = "application/geo+json"

type LinksDrawerProps = {
    drawer: boolean,
    isMergeDataDialogOpen: boolean,
    rail: boolean,
    globalStore: any
}
export default {
    name: "LinksDrawer",
    components: {
        MergeDataDialog
    },
    data ():LinksDrawerProps {
        return {
            drawer: true,
            rail: true,
            // activeTab: "home",
            globalStore: useGlobalStore(),
            isMergeDataDialogOpen: false
            // sourcesLinks: []
        }
    },
    methods: {
        getActiveTabName() {
            return `Linked Sources`// | ${this.activeTab}
        },
        async mergeWithFeatures(features: any[], featuresLinks:LinkinItem, dataset: any[], datasetLinks:LinkinItem[]) {
            let _features = []
            for(let i=0; i<features.length; i++) {
                let matchs = []
                let matchsObject:any = {}
                for(let k=0; k<dataset.length; k++) {
                    matchs = dataset[k].filter((_obj:any) => _obj[datasetLinks[k].term] === features[i]["properties"][featuresLinks.term])
                    matchsObject[datasetLinks[k].source] = matchs
                }
                
                let properties = {...features[i]["properties"], ...matchsObject}
                features[i]["properties"] = properties
                _features.push(features[i])
            }
            return _features
        },
        async mergeData(sourcesLink:LinkinItem[]) {
            this.openMergeDataDialog()
            let dataset = []
            let datasetLinks:LinkinItem[] = []

            let features = []
            let featuresLinks:LinkinItem|null = null
            
            let collectedFeatures = false
            for(let i=0; i<sourcesLink.length; i++) {
                let response = await this.fetchData(sourcesLink[i].source)
                let data = await response.json()
                if(response.headers.get("content-type") === CONTENT_TYPE_GEOJSON && !collectedFeatures) {
                    features = data["features"]
                    collectedFeatures = true
                    featuresLinks = sourcesLink[i]
                } else {
                    dataset.push(data)
                    datasetLinks.push(sourcesLink[i])
                }
            }
            
            if(collectedFeatures) {
                let _features = await this.mergeWithFeatures(features, featuresLinks as LinkinItem, dataset, datasetLinks)
                this.globalStore.setCurrentLayer({"type": "FeatureCollection", "features": _features})
            } else {
                // this.mergeData(dataset, datasetLinks)
            }
            
            this.closeMergeDataDialog()
        },
        async fetchData (url:string) {
            const resp = await fetch(url)
            // console.log(resp)
            // const json = await resp.json()
            return resp
        },
        openMergeDataDialog() {
            this.isMergeDataDialogOpen = true
        },
        closeMergeDataDialog() {
            this.isMergeDataDialogOpen = false
        }
    },
    watch: {
        'sourcesLinks': function() {
            // console.log(this.sourcesLinks)
        }
    }
}
</script>
<template>
    <v-card>
        <v-layout>
            <v-navigation-drawer location="right" v-model="drawer" :rail="rail" permanent @click="rail = false">
                <v-list-item class="header-item" :title="getActiveTabName()" nav>
                    <template v-slot:append>
                        <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
                    </template>
                </v-list-item>
  
                <!-- <pre>{{ globalStore.sourcesLinks }}</pre> -->
                <v-divider></v-divider>
  
                <v-list density="compact">
                    <v-list-item v-for="sourcesLink in Object.keys(globalStore.sourcesLinks)" :key="sourcesLink">
                        <div class="item-content">
                            <v-list-item-title class="item-title">{{ sourcesLink }}</v-list-item-title>
                            <v-btn icon="mdi-send" @click="($event:any) => mergeData(globalStore.sourcesLinks[sourcesLink])"></v-btn>
                        </div>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
        </v-layout>
        <MergeDataDialog   :isMergeDataDialogOpen="isMergeDataDialogOpen" />
    </v-card>
</template>
<style>
.item-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    vertical-align: middle;
    /* border: #ccc solid 2px; */
}
.item-title {
    /* background-color: aqua; */
    vertical-align: middle;
    margin: auto 0 auto 10px;
}
</style>