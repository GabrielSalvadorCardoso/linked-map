<script lang="ts">
import LinkSourcesTable from '../tables/LinkSourcesTable.vue'

import DataDescription from '../../models/DataDescription'
// @ts-ignore
import { useGlobalStore } from "@/stores/GlobalStore";

// import SvgIcon from '@jamescoyle/vue-icon';
// import { mdiCheckOutline } from '@mdi/js';

export interface DataDescriptionMap {
    [key:string]: DataDescription
}

type LinkSourcesProps = {
    entryPoint: any,
    urls: string[],
    requestedUrls: string[],
    contexts: DataDescriptionMap,
    contextViewDialogOpen: boolean,
    contextOpened: any,
    // isLinkSourceDialogOpen: boolean,
    contextTableItems: TableItem[],
    // selectedTableItems: TableItem[],
    coincidentSemantics: any,
    globalStore: any
}

export type TableItem = {
    type: string|null|undefined,
    term: string,
    semantic: string,
    source: string,
    matchsWith: number[]
}

export default {
    name: "LinkSources",
    components: {
        LinkSourcesTable
    },
    data():LinkSourcesProps {
        return {
            // path: mdiCheckOutline,
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
            contextViewDialogOpen: false,
            contextOpened: undefined,

            // isLinkSourceDialogOpen: false,
            contextTableItems: [],
            coincidentSemantics: {
                // "schema:identifier": 2
            },
            // selectedTableItems: [],
            globalStore: useGlobalStore()
        }
    }, 
    methods: {
        async fetchMetadata(url:string) {
            const resp = await fetch(url, {
                method: 'OPTIONS'
            })
            const json = await resp.json()
            return json
        },
        async fetchEntryPoint () {
            console.log(this.entryPoint.url)
            const resp = await fetch(this.entryPoint.url)
            const json = await resp.json()
            return json
        },
        mergeDataWithDescription(data:Object, metadata:Object) {
            return new Promise((resolve, reject) => {
                try {
                    resolve({...data, ...metadata});
                } catch (err) {
                    reject(err);
                }
            })
        },

        // URLs manipulation
        addCurrentURL() {
            if(!!this.entryPoint.url && !this.urlExists(this.entryPoint.url.trim()))
                this.urls.push(this.entryPoint.url.trim())
        },
        urlExists(url:string) {
            return this.requestedUrls.includes(url) || Object.keys(this.contexts).includes(url)
        },

        // merge table methods
        removeNotCoincidentSemantics(semanticCounters:Object) {
            let _coincidentSemantics:any = {}
            for(let k=0; k<Object.entries(semanticCounters).length; k++) {
                let semantic = Object.entries(semanticCounters)[k][0]
                let count = Object.entries(semanticCounters)[k][1]
                if(count>1) {
                    _coincidentSemantics[semantic] = count
                }
            }
            return _coincidentSemantics
        },
        createCoincidentSemanticsMapper() {
            let coincidentSemantics:any = {}
            for(let i=0; i<this.contextTableItems.length; i++) {

                if(Object.keys(coincidentSemantics).includes(this.contextTableItems[i].semantic) ) {
                    coincidentSemantics[this.contextTableItems[i].semantic] = coincidentSemantics[this.contextTableItems[i].semantic]+1
                } else {
                    coincidentSemantics[this.contextTableItems[i].semantic] = 1
                }
            }
            this.coincidentSemantics = this.removeNotCoincidentSemantics(coincidentSemantics)
        },
        getConincidentItemsIndexes(semanticToFind:string):number[] {
            const indexes:number[] = [];
            this.contextTableItems.forEach((element, index) => {
                if (element.semantic === semanticToFind) {
                    indexes.push(index);
                }
            });

            return indexes
        },
        disableCoincidentItems(){
            this.createCoincidentSemanticsMapper()
            
            let indexesToDisableSemantic = []

            for(let i=0; i<this.contextTableItems.length; i++) {
                let currentSemantic = this.contextTableItems[i].semantic
                if(!Object.keys(this.coincidentSemantics).includes(currentSemantic)) {
                    indexesToDisableSemantic = []
                    continue

                } else {
                    indexesToDisableSemantic = this.getConincidentItemsIndexes(currentSemantic)
                    indexesToDisableSemantic = indexesToDisableSemantic.filter((_idx:number) => _idx !== i);
                    this.contextTableItems[i].matchsWith = indexesToDisableSemantic
                }
            }
        },
        orderTableItemsBySemantic(tableItems:TableItem[]) {
            return tableItems.sort((a, b) => (a.semantic > b.semantic) ? 1 : -1)
        },
        removeJSONLDTermDefinitions() {
            const JSONLD_ATYPE_KEYWORD = "@type";
            const JSONLD_AID_KEYWORD = "@id"
            const JSONLD_SEMANTIC_DEFINITIONS = [JSONLD_AID_KEYWORD, JSONLD_ATYPE_KEYWORD]
            this.contextTableItems = this.contextTableItems.filter((_item) => !JSONLD_SEMANTIC_DEFINITIONS.includes(_item.semantic) )
            this.removeHyperResourceVocabPrefixDefinition()
        },
        removeHyperResourceVocabPrefixDefinition(){
            const HYPER_RESOURCE_VOCAB_KEYWORD = "hr"
            this.contextTableItems = this.contextTableItems.filter((_item) => HYPER_RESOURCE_VOCAB_KEYWORD !== _item.term )
        },
        removeVocabPrefixDefinitions() {
            let allTerms = this.contextTableItems.map((_item) => _item.term)
            let allSemantics = this.contextTableItems.map((_item) => _item.semantic)
            let termsToExclude:string[] = []
            for(let termsKey = 0; termsKey<allTerms.length; termsKey++) {
                let curTerm = allTerms[termsKey];
                for(let semanticsKey = 0; semanticsKey<allSemantics.length; semanticsKey++) {
                    if(allSemantics[semanticsKey].startsWith(`${curTerm}:`) && !termsToExclude.includes(curTerm)) {
                        termsToExclude.push(curTerm)
                        break
                    }
                }
            }

            this.contextTableItems = this.contextTableItems.filter((_item) => !termsToExclude.includes(_item.term))
        },
        generateContextTableItems():TableItem[] {
            let tableItems:TableItem[] = []
            const JSONLD_AID_KEYWORD = "@id"
            const JSONLD_ATYPE_KEYWORD = "@type";
            for(let i=0; i<Object.keys(this.contexts).length; i++) {
                let source = Object.keys(this.contexts)[i]
                for(let k=0; k<Object.entries(this.contexts[source]._context).length; k++) {
                    let item:TableItem = {
                        type: undefined,
                        term: '',
                        semantic: '',
                        source: source,
                        matchsWith: []
                    }
                    // item.source = source
                    let term = Object.entries(this.contexts[source]._context)[k][0]
                    let termVal:any = Object.entries(this.contexts[source]._context)[k][1]

                    item.term = term
                    
                    if(typeof termVal === 'string') {
                        item.semantic = termVal
                    } else if(typeof termVal === 'object' && Object.keys(termVal).includes(JSONLD_AID_KEYWORD)) {
                        item.semantic = termVal[JSONLD_AID_KEYWORD]
                    }
                    if(typeof termVal === 'object' && Object.keys(termVal).includes(JSONLD_ATYPE_KEYWORD)) {
                        item.type = termVal[JSONLD_ATYPE_KEYWORD]
                    }                    

                    tableItems.push(item)
                }
                
            }
            tableItems = this.orderTableItemsBySemantic(tableItems)
            // this.disableCoincidentItems()
            return tableItems
        },
        async fetchOptionsToURL(url:string) {
            const JSONLD_ACONTEXT_KEYWORD = "@context";
            const JSONLD_ATYPE_KEYWORD = "@type";

            const data = await this.fetchMetadata(url)
            this.urls = this.urls.filter((_url) => _url !== url)
            this.requestedUrls.push(url)
            if(!Object.keys(this.contexts).includes(url)) {
                this.contexts[url] = new DataDescription(url, data[JSONLD_ACONTEXT_KEYWORD], data[JSONLD_ATYPE_KEYWORD])//data
            }

            if(Object.keys(this.contexts).length > 1) {
                this.contextTableItems = this.generateContextTableItems()
                this.removeJSONLDTermDefinitions()
                this.removeVocabPrefixDefinitions()
                this.disableCoincidentItems()
            }
            
        },

        // context view dialog open/close
        openContextViewDialog(url:string) {
            this.contextViewDialogOpen = true
            this.contextOpened = url
        },
        closeContextViewDialog() {
            this.contextViewDialogOpen = false
            this.contextOpened = undefined
        }
    }
}
</script>

<template>
    <div class="container">
        <v-card class="form">
            <v-card-title class="text-subtitle-1">Sugestions of Resource URLs</v-card-title>
            <v-card-text>
                http://bcim.geoapi <br />
                http://localhost:8001 <br />
                http://bcim.geoapi/lim-unidade-federacao-a-list <br />
                http://bcim.geoapi/lim-municipio-a-list <br />
                http://localhost:8001/taxas-rendimento-escolar-por-municipio-list
            </v-card-text>

            <v-text-field class="url-input" persistent-placeholder clearable label="Resource URL" v-model="entryPoint.url" variant="outlined"></v-text-field>
            <!-- <v-btn class="execute-btn" v-on:click="$event => requestEntryPoint()" variant="outlined">Add</v-btn> -->
            <v-btn class="execute-btn" v-on:click="($event:any) => addCurrentURL()" variant="outlined">Add</v-btn>

            <v-list lines="one">
                <v-card-title class="text-subtitle-1">Registered URLs</v-card-title>
                <v-list-item v-for="url in urls" :key="url">
                    <div class="item-content">
                        <v-list-item-title class="item-title">{{ url }}</v-list-item-title>
                        <v-btn v-on:click="($event:any) => fetchOptionsToURL(url.trim())">OPTIONS</v-btn>
                    </div>
                </v-list-item>

                <v-card-title class="text-subtitle-1">Loaded Contexts</v-card-title>
                <v-list-item v-for="requestedUrl in requestedUrls" :key="requestedUrl">
                    <div class="item-content">
                        <v-list-item-title class="item-title">{{ requestedUrl }}</v-list-item-title>
                        <v-btn @click.stop="openContextViewDialog(requestedUrl)">View context</v-btn>
                    </div>
                    
                    <v-col cols="auto">
                        <v-dialog transition="dialog-bottom-transition" v-model="contextViewDialogOpen" width="auto">
                            <v-card>
                                <v-toolbar color="primary" :title="`Context of: ${contextOpened}`"></v-toolbar>
                                <v-card-text>
                                    <pre>{{ contexts[contextOpened].getRepresentation() }}</pre>
                                </v-card-text>
                                <v-card-actions class="justify-end">
                                    <v-btn variant="text" @click="contextViewDialogOpen = false">Close</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-col>
                    
                </v-list-item>
            </v-list>
        </v-card>
        
    </div>
    <LinkSourcesTable :contexts="contexts" :contextTableItems="contextTableItems" />
</template>

<style scoped>
.container {
    /* margin: 10px 255px; */
    margin-left: v-bind('globalStore.mainContentMarginLeft');
    /* margin-right: ; */
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.checkbox-td {
    padding: 0;
    display: flex;
    justify-content: center;
}
.checkbox-data {
    margin: 0;
    padding: 0;
}
.url-input {
    margin: 10px;
}
.execute-btn {
    margin: 10px auto;
}
.form {
    display: flex;;
    flex-direction: column;
}
.link-sources-btn {
    margin: auto;
}
.url-field {
    display: flex;
    flex-direction: row;
    margin: auto;
}
.url-field input {
    border: solid #000 1px;
}
.item-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    vertical-align: middle;
    border: #ccc solid 2px;
}
.item-title {
    vertical-align: middle;
    margin: auto 0 auto 10px;
}
</style>