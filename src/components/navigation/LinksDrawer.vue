<script setup lang="ts">
import { useGlobalStore } from "@/stores/GlobalStore";
import { type LinkinItem } from "@/stores/GlobalStore";
// @ts-ignore
import MergeDataDialog from "../maps/MergeDataDialog.vue";
import FeatureInfoDialog from "../maps/FeatureInfoDialog.vue";

import { ref } from "vue";

const CONTENT_TYPE_GEOJSON = "application/geo+json"
const JSONLD_ACONTEXT_KEYWORD = "@context"
const JSONLD_AID_KEYWORD = "@id"

const globalStore = useGlobalStore()
const isMergeDataDialogOpen = ref(false)
const isFeatureInfoDialogOpen = ref(false)

const getActiveTabName = () => {
    return `Linked Sources`// | ${this.activeTab}
}
const mergeWithFeatures = async (features: any[], featuresLinks:LinkinItem, featuresMetadata:any, dataset: any[], datasetLinks:LinkinItem[], metadataset: any[]) => {
    let _features = []
    for(let i=0; i<features.length; i++) {
        let matchs = []
        let matchsObject:any = {}
        for(let k=0; k<dataset.length; k++) {
            let idAttribute = (Object.entries(metadataset[k][JSONLD_ACONTEXT_KEYWORD]).find((keyVal) => keyVal[1] === JSONLD_AID_KEYWORD) as unknown as any)[0]
            matchs = dataset[k].filter((_obj:any) => _obj[datasetLinks[k].term] === features[i]["properties"][featuresLinks.term])
            matchs = matchs.map((_match:any) => {
                let attrVal = _match[idAttribute]
                let newMatch:any = {}
                newMatch[`${datasetLinks[k].source}/${attrVal}`] = _match
                return newMatch
            })
            matchs.forEach((m:any) => {
                matchsObject = {...matchsObject, ...m}
            })
        }
        
        let properties = {...features[i]["properties"], ...matchsObject}
        features[i]["properties"] = properties
        _features.push(features[i])
    }
    return _features
}
        
const mergeData = async (sourcesLink:LinkinItem[]) => {
    openMergeDataDialog()
    let dataset = []
    let metadataset = []
    let datasetLinks:LinkinItem[] = []

    let features = []
    let featuresLinks:LinkinItem|null = null
    let featuresMetadata:any = null;
    let collectedFeatures = false

    for(let i=0; i<sourcesLink.length; i++) {
        let response = await fetchData(sourcesLink[i].source)
        let data = await response.json()
        let metadata = await fetchMetadata(sourcesLink[i].source)
        if(response.headers.get("content-type") === CONTENT_TYPE_GEOJSON && !collectedFeatures) {
            features = data["features"]
            collectedFeatures = true
            featuresLinks = sourcesLink[i]
            featuresMetadata = metadata
        } else {
            dataset.push(data)
            datasetLinks.push(sourcesLink[i])
            metadataset.push(metadata)
        }
    }
    
    if(collectedFeatures) {
        let _features = await mergeWithFeatures(features, featuresLinks as LinkinItem, featuresMetadata, dataset, datasetLinks, metadataset)
        globalStore.setCurrentLayer({"type": "FeatureCollection", "features": _features})
    } else {
        // this.mergeData(dataset, datasetLinks)
    }
    
    closeMergeDataDialog()
}
const fetchData = async (url:string) => {
    const resp = await fetch(url)
    return resp
}
const fetchMetadata = async (url:string) => {
    const resp = await fetch(url, {
        method: 'OPTIONS'
    })
    const json = await resp.json()
    return json
}
const openMergeDataDialog = () => {
    isMergeDataDialogOpen.value = true
}
const closeMergeDataDialog = () => {
    isMergeDataDialogOpen.value = false
}
const openFeatureInfoDialog = () => {
    isFeatureInfoDialogOpen.value = true
}
const closeFeatureInfoDialog = () => {
    isFeatureInfoDialogOpen.value = false
}
const setLinksDrawerRail = (event:any, rail:boolean) => {
    globalStore.setLinksDrawerRail(rail)
}

const getFormattedSourcesLink = (sourcesLink:string) => {
    let individualLinks = sourcesLink.split("+")
    let formattedLinks = []
    for(let i=0; i<individualLinks.length; i++) {
        formattedLinks.push(individualLinks[i].trim())
        // formattedLinks.push()
    }
    return formattedLinks.join("\n")
}
</script>
<template>
    <v-card>
        <v-layout>
            <v-navigation-drawer location="right" :v-bind="globalStore.isLinksDrawerOpen" :rail="globalStore.linksDrawerRail" permanent @click="($event:any, rail:boolean) => setLinksDrawerRail($event, false)">
                <v-list-item  prepend-avatar="https://json-ld.org/images/json-ld-data-24.png" :title="getActiveTabName()" nav>
                    <template v-slot:append>
                        <v-btn variant="text" icon="mdi-chevron-right" @click.stop="($event:any, rail:boolean) => setLinksDrawerRail($event, !rail)"></v-btn>
                    </template>
                </v-list-item>
                <v-divider></v-divider>
  
                <v-list density="compact">
                    <v-list-item    class="sourceLinkItem"
                                    v-for="sourcesLink in Object.keys(globalStore.sourcesLinks)" :key="sourcesLink">
                                    
                                    <v-tooltip activator="parent" location="start">
                                        <pre>{{ getFormattedSourcesLink(sourcesLink) }}</pre>
                                    </v-tooltip>
                                    
                                    <v-menu transition="scale-transition">
                                        
                                        <!-- eslint-disable-next-line vue/no-unused-vars -->
                                        <template v-slot:activator="{ props }">
                                            <v-btn v-bind="props">
                                                {{ sourcesLink }}
                                            </v-btn>
                                        </template>
                                        
                                        <v-list>
                                            <v-list-item    title="Render Layer"
                                                            prepend-icon="mdi-map-plus"
                                                            @click="($event:any) => mergeData(globalStore.sourcesLinks[sourcesLink])">
                                            </v-list-item>
                                            <v-list-item    title="Get Info"
                                                            prepend-icon="mdi-information"
                                                            :disabled="globalStore.currentLayer === null"
                                                            @click="($event:any) => openFeatureInfoDialog()">
                                            </v-list-item>
                                        </v-list>
                                    </v-menu>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
        </v-layout>
        <MergeDataDialog   :isMergeDataDialogOpen="isMergeDataDialogOpen" />
        <FeatureInfoDialog :isFeatureInfoDialogOpen="isFeatureInfoDialogOpen" @closeFeatureInfoDialog="closeFeatureInfoDialog" />
    </v-card>
</template>
<style>
.sourceLinkItem {
    cursor: pointer;
}
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