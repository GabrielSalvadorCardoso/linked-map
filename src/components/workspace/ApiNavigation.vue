<script setup lang="ts">
import { ref } from 'vue';
// @ts-ignore
import EntryPointExpansionPanels from '../utils/EntryPointExpansionPanels.vue'
// @ts-ignore
import Internationalization from "../../utils/Internationalization";
const url = ref("")

import { useGlobalStore, type NavigationEntryPoints } from "@/stores/GlobalStore";
import LinkTerm from '@/models/LinkTerm';
import HyperResourceUtils from '@/models/HyperResourceUtils';
const globalStore = useGlobalStore()

const isLinkTerm = (valObject:any) => {
    return (
        typeof valObject === 'object' &&
        Object.keys(valObject).includes(HyperResourceUtils.JSONLD_AID_KEYWORD) &&
        Object.keys(valObject).includes(HyperResourceUtils.JSONLD_ATYPE_KEYWORD) &&
        valObject[HyperResourceUtils.JSONLD_ATYPE_KEYWORD] === HyperResourceUtils.JSONLD_AID_KEYWORD
    )
}

const formatEntryPointMetadata = (source:string, rawContext:any):LinkTerm[] => {
    let _endpoints:LinkTerm[] = []
    for(let i=0; i<Object.entries(rawContext[HyperResourceUtils.JSONLD_ACONTEXT_KEYWORD]).length; i++) {
        let term:string = Object.entries(rawContext[HyperResourceUtils.JSONLD_ACONTEXT_KEYWORD])[i][0] as unknown as string
        let valObject:any = Object.entries(rawContext[HyperResourceUtils.JSONLD_ACONTEXT_KEYWORD])[i][1]
        if(isLinkTerm(valObject)) {
            let id = valObject[HyperResourceUtils.JSONLD_AID_KEYWORD]
            _endpoints.push(new LinkTerm(source, term, id))
        }
    }
    return _endpoints
}

const requestEntryPointMetadata = async () => {
    
    let resp = await fetch(url.value, {
        method: 'OPTIONS'
    })
    
    let json = await resp.json()
    let serilized = formatEntryPointMetadata(url.value, json)
    let obj:NavigationEntryPoints = {}
    obj[url.value] = serilized
    globalStore.addNavigationEntryPoint(obj)
}
</script>

<template>
    <div class="container">
        <p> http://bcim.geoapi </p>
        <p> http://inep.api </p>
        <p> http://anatel.api </p>

        <p> http://bcim.geoapi/lim-municipio-a-list/filter/geocodigo/eq/3304557 </p>
        <p> http://inep.api/taxas-rendimento-escolar-por-municipio-list/filter/codigo_municipio/eq/3304557 </p>
        <p> http://anatel.api/conectividade-escola-list/filter/codigo_municipio/eq/3304557 </p>
        <v-text-field   class="url-input"
                        persistent-placeholder
                        clearable
                        :label="Internationalization.getLocaleString('apiExplorerEntryPointURLsLabel', globalStore.idiom)"
                        v-model="url"
                        variant="outlined">
        </v-text-field>
        
        <v-btn  class="execute-btn"
                v-on:click="($event:any) => requestEntryPointMetadata()"
                variant="outlined">
                {{ Internationalization.getLocaleString('addInformationLayerDialogTitle', globalStore.idiom) }}
        </v-btn>
        <entry-point-expansion-panels />
    </div>
</template>

<style>
.container {
    margin-left: v-bind('globalStore.mainContentMarginLeft');
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.execute-btn {
    margin: 10px auto;
}
.url-input {
    margin: 10px;
}
</style>