<script lang="ts">
import Internationalization from "../../utils/Internationalization";
import { useGlobalStore } from "@/stores/GlobalStore";
import DataDescription from '../../models/DataDescription'

export interface DataDescriptionMap {
    [key:string]: DataDescription
}

type RegisteredURLsManagerProps = {
    entryPoint: any,
    urls: string[],
    requestedUrls: string[],
    selectedUrls: string[],
    contexts: DataDescriptionMap,
    globalStore: any
}
// const emit = defineEmits(['confirmLinkedSources', 'closeLinkSourceDialog'])
export default {
    name: 'RegisteredURLsManager',
    components: {},
    props: ['requestContextForURLs'],
    data():RegisteredURLsManagerProps {
        return {
            entryPoint: {
                url: undefined,//"http://bcim.geoapi",
                data: {},
                metadata: {},
                contextualizedData: {},
                proccessedJSONLD: {}
            },
            urls: [],
            requestedUrls: [],
            contexts: {},
            selectedUrls: [],
            globalStore: useGlobalStore()
        }
    },
    methods: {
        addCurrentURL() {
            if(!!this.entryPoint.url && !this.urlExists(this.entryPoint.url.trim()))
                this.urls.push(this.entryPoint.url.trim())
        },
        setURLSToGetContext() {
            // alert(this.selectedUrls)
            // this.$emit('requestContextForURLs')
            this.requestContextForURLs(this.selectedUrls)
        },
        urlExists(url:string) {
            return this.requestedUrls.includes(url) || Object.keys(this.contexts).includes(url)
        },

        getRegisterNewURLLabel(idiom:string) {
            return Internationalization.getLocaleString('linkSourceRegisterNewURL', idiom)
        },

        getRegisteredURLsLabel(idiom:string) {
            return Internationalization.getLocaleString('linkSourceRegisterNewURL', idiom)
        }
    }
}
</script>

<template>
    <v-card class="form">
        <v-card-title class="text-subtitle-1">                
            <!-- {{ getRegisteredURLsLabel(globalStore.idiom) }} -->
            Select URLs to get context
        </v-card-title>
        
        <v-card-text>
            <v-list lines="one" density="compact">
                <v-list-item density="compact" v-for="link in globalStore.registeredLinks" :key="link">                    
                    <v-checkbox density="compact" v-model="selectedUrls" :value="link" :label="link"/>
                </v-list-item>
            </v-list>
        </v-card-text>

        <!-- <v-card-item>
            <v-text-field class="url-input" persistent-placeholder clearable label="Resource URL" v-model="entryPoint.url" variant="outlined"></v-text-field>
        </v-card-item>             -->
        
        <v-card-actions>
            <v-btn class="execute-btn" v-on:click="($event:any) => setURLSToGetContext()" variant="outlined">
                <!-- {{ getRegisterNewURLLabel(globalStore.idiom) }} -->
                Get context for the selected URLs
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<style>
</style>