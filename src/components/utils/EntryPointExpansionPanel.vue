<script setup lang="ts">
import LinkTerm from '@/models/LinkTerm';
import { ref } from 'vue';
const JSONLD_ACONTEXT_KEYWORD = "@context"
const JSONLD_AID_KEYWORD:string = "@id"
const JSONLD_ATYPE_KEYWORD = "@type";
interface EntryPointExpansionPanelProps {
    title: string,
    content: any
}

const isLinkTerm = (valObject:any) => {
    return (
        typeof valObject === 'object' &&
        Object.keys(valObject).includes(JSONLD_AID_KEYWORD) &&
        Object.keys(valObject).includes(JSONLD_ATYPE_KEYWORD) &&
        valObject[JSONLD_ATYPE_KEYWORD] === JSONLD_AID_KEYWORD
    )
}

const formatEntryPointMetadata = (_content:any) => {
    let _endpoints:LinkTerm[] = []
    for(let i=0; i<Object.entries(_content[JSONLD_ACONTEXT_KEYWORD]).length; i++) {
        let term:string = Object.entries(_content[JSONLD_ACONTEXT_KEYWORD])[i][0] as unknown as string
        let valObject:any = Object.entries(_content[JSONLD_ACONTEXT_KEYWORD])[i][1]
        if(isLinkTerm(valObject)) {
            let id = valObject[JSONLD_AID_KEYWORD]
            _endpoints.push(new LinkTerm(title.value, term, id))
        }
    }
    return _endpoints
}

const requestEndpointMetadata = (endpointUrl:string) => {
    alert(endpointUrl)
}

const props = defineProps<EntryPointExpansionPanelProps>()
const title = ref(props.title)
const endpoints = ref(formatEntryPointMetadata(props.content))
</script>
<template>
    <v-expansion-panels>
        <v-expansion-panel>
            <v-expansion-panel-title>{{ title }}</v-expansion-panel-title>
            <v-expansion-panel-text>
                <v-list v-for="endpoint in endpoints" density="compact" :key="endpoint.getLink()">
                    <v-tooltip :text="endpoint._id" location="center">
                        <template v-slot:activator="{ props }">
                            <v-list-item v-bind="props" prepend-icon="mdi-information">
                                <div class="item-content">
                                    <v-list-item-title>{{ endpoint.getLink() }}</v-list-item-title>
                                    <v-icon @click="requestEndpointMetadata(endpoint.getLink())" icon="mdi-code-json"></v-icon>
                                </div>
                            </v-list-item>
                        </template>
                    </v-tooltip>
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