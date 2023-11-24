<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import HyperResourceSupportedPropertiesTable from '../tables/HyperResourceSupportedPropertiesTable.vue';
import HyperResourceSupportedOperationsTable from '../tables/HyperResourceSupportedOperationsTable.vue';
import { useGlobalStore, type NavigationEndPoints } from '@/stores/GlobalStore';
import type LinkTerm from '@/models/LinkTerm';
import HyperResourceContext from '@/models/HyperResourceContext';
import { storeToRefs } from 'pinia';
interface CollectionExpansionPanelProps {
    // title: string,
    collectionsLinks:  LinkTerm[]
}
const props = defineProps<CollectionExpansionPanelProps>()
const collectionsLinks = ref(props.collectionsLinks)
const globalStore = useGlobalStore()
const requestEndPointMetadata = async (endpointUrl:string) => {
    if(Object.keys(globalStore.navigationEndPointsLoaded).includes(endpointUrl)) return;
    
    let resp = await fetch(endpointUrl, { method: 'OPTIONS' })
    let json = await resp.json()
    let context:HyperResourceContext = HyperResourceContext.build(endpointUrl, json)
    
    let obj:NavigationEndPoints = {}
    obj[endpointUrl] = context
    globalStore.addNavigationEndPoint(obj)
}
const { navigationEndPointsLoaded } = storeToRefs<any>(globalStore)

watch(navigationEndPointsLoaded, () => {
    // console.log(navigationEndPointsLoaded.value)
})

const registeredLink = ref("")
const alert = ref(false)

// const registerLink = (link:string) => {
//     registeredLink.value = link
//     isAlertOpen.value = true    
//     window.setInterval(() => {
//         isAlertOpen.value = false;
//         console.log("hide alert after 3 seconds");
//     }, 3000) 
// }
const sleep = (delay:number) => new Promise((resolve) => setTimeout(resolve, delay))
const registerLink = async (link:string) => {
    registeredLink.value = link
    alert.value = true
    globalStore.registerLink(link)
    await sleep(3000)
    alert.value = false;
}
</script>
<template>
    <v-expansion-panels v-for="link in collectionsLinks" :key="link.getLink()">
        <v-expansion-panel @click="requestEndPointMetadata(link.getLink())">
            <v-expansion-panel-title>{{ link.getLink() }}</v-expansion-panel-title>
            <v-expansion-panel-text>
                <v-row justify="space-around" no-gutters >
                    <v-col cols="5">
                        <HyperResourceSupportedPropertiesTable v-if="navigationEndPointsLoaded[link.getLink()]"
                            :supportedProperties="navigationEndPointsLoaded[link.getLink()]._supportedProperties" />        
                    </v-col>

                    <v-col cols="5">
                        <HyperResourceSupportedOperationsTable v-if="navigationEndPointsLoaded[link.getLink()]"
                                :supportedOperations="navigationEndPointsLoaded[link.getLink()]._supportedOperations" />    
                    </v-col>                    
                </v-row>
                <v-row justify="space-around" no-gutters>
                    <v-btn class="execute-btn" v-on:click="($event:any) => registerLink(link.getLink())" variant="outlined">Register</v-btn>
                    
                </v-row>
                <v-alert    closable
                            title="Registered link"
                            transition="fade-transition"
                            :text="`Reference ${registeredLink} available to link with another sources`"
                            v-if="alert"
                            type="success">
                </v-alert>

            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>    
</template>
<style>
.item-content {
    display: flex;
    flex-direction: row;
    /* justify-content: space-between; */
    vertical-align: middle;
    border-bottom: #ccc solid 2px;
}
.item-info {
    display: flex;
    flex-direction: row;
    vertical-align: middle;
}
.item-icon {
    margin: auto 2px;
}
.execute-btn {
    margin: 10px auto;
}
</style>