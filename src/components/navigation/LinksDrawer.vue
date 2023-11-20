<script setup lang="ts">
import { useGlobalStore } from "@/stores/GlobalStore";
import { type LinkinItem } from "@/stores/GlobalStore";
// @ts-ignore
import MergeDataDialog from "../maps/MergeDataDialog.vue";
import { ref } from "vue";

const CONTENT_TYPE_GEOJSON = "application/geo+json"
const JSONLD_ACONTEXT_KEYWORD = "@context"
const JSONLD_AID_KEYWORD = "@id"

const globalStore = useGlobalStore()

// interface LinksDrawerProps {
//     drawer: boolean,
//     isMergeDataDialogOpen: boolean,
//     rail: boolean,
    
// }

// const drawer = ref(true)
const isMergeDataDialogOpen = ref(false)
// export default {
//     // name: "LinksDrawer",
//     // components: {
//     //     MergeDataDialog
//     // },
//     data ():LinksDrawerProps {
//         return {
//             drawer: true,
//             rail: true,
//             // activeTab: "home",
//             ,
//             isMergeDataDialogOpen: false
//             // sourcesLinks: []
//         }
//     },
//     methods: {
//         getActiveTabName() {
//             return `Linked Sources`// | ${this.activeTab}
//         },
//         async mergeWithFeatures(features: any[], featuresLinks:LinkinItem, featuresMetadata:any, dataset: any[], datasetLinks:LinkinItem[], metadataset: any[]) {
//             let _features = []
//             for(let i=0; i<features.length; i++) {
//                 let matchs = []
//                 let matchsObject:any = {}
//                 for(let k=0; k<dataset.length; k++) {
//                     let idAttribute = (Object.entries(metadataset[k][JSONLD_ACONTEXT_KEYWORD]).find((keyVal) => keyVal[1] === JSONLD_AID_KEYWORD) as unknown as any)[0]
//                     matchs = dataset[k].filter((_obj:any) => _obj[datasetLinks[k].term] === features[i]["properties"][featuresLinks.term])
//                     matchs = matchs.map((_match:any) => {
//                         let attrVal = _match[idAttribute]
//                         let newMatch:any = {}
//                         newMatch[`${datasetLinks[k].source}/${attrVal}`] = _match
//                         return newMatch
//                     })
//                     matchs.forEach((m:any) => {
//                         matchsObject = {...matchsObject, ...m}
//                     })
//                 }
                
//                 let properties = {...features[i]["properties"], ...matchsObject}
//                 features[i]["properties"] = properties
//                 _features.push(features[i])
//             }
//             return _features
//         },
//         async mergeData(sourcesLink:LinkinItem[]) {
//             this.openMergeDataDialog()
//             let dataset = []
//             let metadataset = []
//             let datasetLinks:LinkinItem[] = []

//             let features = []
//             let featuresLinks:LinkinItem|null = null
//             let featuresMetadata:any = null;
//             let collectedFeatures = false

//             for(let i=0; i<sourcesLink.length; i++) {
//                 let response = await this.fetchData(sourcesLink[i].source)
//                 let data = await response.json()
//                 let metadata = await this.fetchMetadata(sourcesLink[i].source)
//                 if(response.headers.get("content-type") === CONTENT_TYPE_GEOJSON && !collectedFeatures) {
//                     features = data["features"]
//                     collectedFeatures = true
//                     featuresLinks = sourcesLink[i]
//                     featuresMetadata = metadata
//                 } else {
//                     dataset.push(data)
//                     datasetLinks.push(sourcesLink[i])
//                     metadataset.push(metadata)
//                 }
//             }
            
//             if(collectedFeatures) {
//                 let _features = await this.mergeWithFeatures(features, featuresLinks as LinkinItem, featuresMetadata, dataset, datasetLinks, metadataset)
//                 this.globalStore.setCurrentLayer({"type": "FeatureCollection", "features": _features})
//             } else {
//                 // this.mergeData(dataset, datasetLinks)
//             }
            
//             this.closeMergeDataDialog()
//         },
//         async fetchData (url:string) {
//             const resp = await fetch(url)
//             // console.log(resp)
//             // const json = await resp.json()
//             return resp
//         },
//         async fetchMetadata(url:string) {
//             const resp = await fetch(url, {
//                 method: 'OPTIONS'
//             })
//             const json = await resp.json()
//             return json
//         },
//         openMergeDataDialog() {
//             this.isMergeDataDialogOpen = true
//         },
//         closeMergeDataDialog() {
//             this.isMergeDataDialogOpen = false
//         }
//     }
// }
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
    // console.log(resp)
    // const json = await resp.json()
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
const setNavigationDrawerState = (event:any, rail:boolean) => {    
    console.log(rail)
    globalStore.setLinksDrawerRail(rail)
}
</script>
<template>
    <v-card>
        <v-layout>
            <!-- @ts-ignore -->
            <v-navigation-drawer location="right" v-bind="globalStore.isLinksDrawerOpen" :rail="globalStore.linksDrawerRail" permanent @click="($event:any, rail:boolean) => setNavigationDrawerState($event, false)">
                <v-list-item class="header-item" :title="getActiveTabName()" nav>
                    <template v-slot:append>
                        <v-btn variant="text" icon="mdi-chevron-left" @click.stop="($event:any, rail:boolean) => setNavigationDrawerState($event, !globalStore.linksDrawerRail)"></v-btn>
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