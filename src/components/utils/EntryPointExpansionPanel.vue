<script setup lang="ts">
import LinkTerm from '@/models/LinkTerm';
import { ref } from 'vue';
// @ts-ignore
import CollectionExpansionPanel from './CollectionExpansionPanel.vue'
import { useGlobalStore, type NavigationEndPoints } from '@/stores/GlobalStore';
import HyperResourceContext from '@/models/HyperResourceContext';
const JSONLD_ACONTEXT_KEYWORD = "@context"
const JSONLD_AID_KEYWORD:string = "@id"
const JSONLD_ATYPE_KEYWORD = "@type";
interface EntryPointExpansionPanelProps {
    title: string,
    context: any
}
const globalStore = useGlobalStore()
const isLinkTerm = (valObject:any) => {
    return (
        typeof valObject === 'object' &&
        Object.keys(valObject).includes(JSONLD_AID_KEYWORD) &&
        Object.keys(valObject).includes(JSONLD_ATYPE_KEYWORD) &&
        valObject[JSONLD_ATYPE_KEYWORD] === JSONLD_AID_KEYWORD
    )
}

const formatEntryPointMetadata = (_context:any) => {
    let _endpoints:LinkTerm[] = []
    for(let i=0; i<Object.entries(_context[JSONLD_ACONTEXT_KEYWORD]).length; i++) {
        let term:string = Object.entries(_context[JSONLD_ACONTEXT_KEYWORD])[i][0] as unknown as string
        let valObject:any = Object.entries(_context[JSONLD_ACONTEXT_KEYWORD])[i][1]
        if(isLinkTerm(valObject)) {
            let id = valObject[JSONLD_AID_KEYWORD]
            _endpoints.push(new LinkTerm(title.value, term, id))
        }
    }
    return _endpoints
}

const requestEndPointMetadata = async (endpointUrl:string) => {
    if(Object.keys(globalStore.navigationEndPointsLoaded).includes(endpointUrl)) return;
    
    let resp = await fetch(endpointUrl, {
        method: 'OPTIONS'
    })
    let json = await resp.json()
    let context:HyperResourceContext = HyperResourceContext.build(endpointUrl, json)
    
    let obj:NavigationEndPoints = {}
    obj[endpointUrl] = context
    globalStore.addNavigationEndPoint(obj)
}

const props = defineProps<EntryPointExpansionPanelProps>()
const title = ref(props.title)
const endpoints = ref(formatEntryPointMetadata(props.context))
</script>
<template>
    <v-expansion-panels>
        <v-expansion-panel>
            <v-expansion-panel-title>{{ title }}</v-expansion-panel-title>
            <v-expansion-panel-text>
                <v-list v-for="endpoint in endpoints" density="compact"
                        :key="endpoint.getLink()"
                        @click="requestEndPointMetadata(endpoint.getLink())">
                    <CollectionExpansionPanel   :title="endpoint.getLink()"
                                                :context="globalStore.navigationEndPointsLoaded[endpoint.getLink()]"/>
                </v-list>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>
<style>
.item-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
</style>