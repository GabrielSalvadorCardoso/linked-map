<script>
// import { reactive, } from 'vue'
import * as jsonld from 'jsonld';
// import SvgIcon from '@jamescoyle/vue-icon';
// import { mdiCheckOutline } from '@mdi/js';

export default {
    name: "LinkSources",
    components: {
        
    },
    data() {
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
            /*
            termos com a mesma semântica (mesmo @id) e, opcionalmente com o mesmo tipo (@type),
            são passíveis de servirem como atributos de ligação entre fontes diferentes.
            Ou seja, se for encontrado dois termos de diferentes fontes (condição 1)
            com semânticas iguais (condição 2), deve-se destacar este termos para posteriormente
            quentionar o usuário se este deseja ligar essas duas fontes de dados usando esses atributos
             */
            contextTableItems: [],
            coincidentSemantics: {
                "schema:identifier": 2
            }
        }
    }, 
    methods: {
        async requestEntryPoint() {
            event.preventDefault()
            this.fetchMetadata(entryPoint.url)
            .then((metadata) => {
                this.fetchEntryPoint()
                .then((data) => {
                    this.mergeDataWithDescription(data, metadata)
                    .then((contextualizedData) => {
                        // console.log(contextualizedData)
                        jsonld.expand(contextualizedData)
                        .then((proccessedJSONLD) => {
                            // console.log(proccessedJSONLD)
                            this.entryPoint.proccessedJSONLD = proccessedJSONLD
                        })
                    })
                })
                
            })
            
            // entryPoint.data = data
            // entryPoint.metadata = metadata
            // entryPoint.contextualizedData = {...data, ...metadata}
            // entryPoint.proccessedJSONLD = proccessedJSONLD
            
            
        },
        async fetchMetadata(url) {
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
        mergeDataWithDescription(data, metadata) {
            return new Promise((resolve, reject) => {
                try {
                    resolve({...data, ...metadata});
                } catch (err) {
                    reject(err);
                }
            })
        },
        addCurrentURL() {
            if(!!this.entryPoint.url && !this.urlExists(this.entryPoint.url.trim()))
                this.urls.push(this.entryPoint.url.trim())
        },
        urlExists(url) {
            return this.requestedUrls.includes(url) || Object.keys(this.contexts).includes(url)
        },
        disableCoincidentItems(orderedTableItems){
            let tableItems = [
                {
                    term: "coordinates",
                    semantic: "geojson:coordinates",
                    type: "-",
                    source: "http://bcim.geoapi/lim-municipio-a-list",
                    color: "black",
                    backgroundColor: "rgb(125, 125, 125)"
                },
                {
                    term: "taxa_aprovacao",
                    semantic: "inep:xml.php?jsonldTema=738",
                    type: "schema:Float",
                    source: "http://localhost:8001/taxas-rendimento-escolar-por-municipio-list",
                    color: "white",
                    backgroundColor: "rgb(255, 0, 0)"
                },
                {
                    term: "geocodigo",
                    semantic: "schema:identifier",
                    type: "schema:StructuredValue",
                    source: "http://bcim.geoapi/lim-municipio-a-list",
                    color: "black",
                    backgroundColor: "rgb(125, 125, 125)"
                },
                {
                    term: "codigo_municipio",
                    semantic: null,
                    type: "schema:StructuredValue",
                    source: "http://localhost:8001/taxas-rendimento-escolar-por-municipio-list",
                    color: "white",
                    backgroundColor: "rgb(255, 0, 0)"
                }
                
                
                
                
            ]
            return tableItems
            // this.contextTableItems = tableItems
        },
        orderTableItemsBySemantic(tableItems) {
            return tableItems.sort((a, b) => (a.semantic > b.semantic) ? 1 : -1)
        },
        generateContextTableItems() {
            let tableItems = [
                {
                    term: "codigo_municipio",
                    semantic: "schema:identifier",
                    type: "schema:StructuredValue",
                    source: "http://localhost:8001/taxas-rendimento-escolar-por-municipio-list",
                    color: "white",
                    backgroundColor: "rgb(255, 0, 0)"
                },
                {
                    term: "taxa_aprovacao",
                    semantic: "inep:xml.php?jsonldTema=738",
                    type: "schema:Float",
                    source: "http://localhost:8001/taxas-rendimento-escolar-por-municipio-list",
                    color: "white",
                    backgroundColor: "rgb(255, 0, 0)"
                },
                {
                    term: "geocodigo",
                    semantic: "schema:identifier",
                    type: "schema:StructuredValue",
                    source: "http://bcim.geoapi/lim-municipio-a-list",
                    color: "black",
                    backgroundColor: "rgb(125, 125, 125)"
                },
                {
                    term: "coordinates",
                    semantic: "geojson:coordinates",
                    type: "-",
                    source: "http://bcim.geoapi/lim-municipio-a-list",
                    color: "black",
                    backgroundColor: "rgb(125, 125, 125)"
                }
                
            ]
            // tableItems = tableItems.sort(function(a, b) {  return a.semantic - b.semantic;})
            tableItems = this.orderTableItemsBySemantic(tableItems)
            tableItems = this.disableCoincidentItems(tableItems)
            return tableItems
        },
        async fetchOptionsToURL(url) {
            
            const data = await this.fetchMetadata(url)
            console.log(data)
            this.urls = this.urls.filter((_url) => _url !== url)
            this.requestedUrls.push(url)
            if(!Object.keys(this.contexts).includes(url)) {
                this.contexts[url] = data
            }

            console.log(Object.keys(this.contexts))
            if(Object.keys(this.contexts).length > 1) {
                this.contextTableItems = this.generateContextTableItems()
            }
            
        },
        openContextViewDialog(url) {
            this.contextViewDialogOpen = true
            this.contextOpened = url
        },
        closeContextViewDialog() {
            this.contextViewDialogOpen = false
            this.contextOpened = undefined
        },
        randomRgb() {
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            return [r, g, b];
        },
        colourFromRgb(r, g, b) {
            return 'rgb(' + r + ',' + g + ',' + b + ')';
        },
        colourIsLight(r, g, b) {
            // Fonte: https://codepen.io/WebSeed/pen/pvgqEq
            var a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            console.log(a);
            return (a < 0.5);
        },
        getTextColor(){
            var bgRgb = this.randomRgb();
            var textColour = this.colourIsLight(bgRgb[0], bgRgb[1], bgRgb[2]) ? 'black' : 'white'
            return textColour
        },
        getBackgroundColor() {
            var bgColour = this.colourFromRgb(bgRgb[0], bgRgb[1], bgRgb[2]);
            return bgColour
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
            <v-btn class="execute-btn" v-on:click="$event => addCurrentURL()" variant="outlined">Add</v-btn>

            <v-list lines="one">
                <v-card-title class="text-subtitle-1">Registered URLs</v-card-title>
                <v-list-item v-for="url in urls" :key="url">
                    <v-list-item-content class="item-content">
                        <v-list-item-title class="item-title">{{ url }}</v-list-item-title>
                        <v-list-item-icon>
                            <v-btn v-on:click="$event => fetchOptionsToURL(url.trim())">OPTIONS</v-btn>
                        </v-list-item-icon>
                    </v-list-item-content>                    
                </v-list-item>

                <v-card-title class="text-subtitle-1">Loaded Contexts</v-card-title>
                <v-list-item v-for="requestedUrl in requestedUrls" :key="requestedUrl">
                    <v-list-item-content class="item-content">
                        <v-list-item-title class="item-title">{{ requestedUrl }}</v-list-item-title>
                        <v-btn @click.stop="openContextViewDialog(requestedUrl)">View context</v-btn>
                    </v-list-item-content>
                    
                    <v-col cols="auto">
                        <v-dialog transition="dialog-bottom-transition" v-model="contextViewDialogOpen" width="auto">
                            <v-card>
                                <v-toolbar color="primary" :title="`Context of: ${contextOpened}`"></v-toolbar>
                                <v-card-text>
                                    <pre>{{ contexts[contextOpened] }}</pre>
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
        <!-- <pre>{{ entryPoint.data }}</pre>
        <pre>{{ entryPoint.metadata }}</pre>
        <pre>{{ entryPoint.contextualizedData }}</pre> -->
        <!-- <pre>{{ entryPoint.proccessedJSONLD }}</pre> -->
        <!-- <pre>{{contexts}}</pre> -->

        <v-table density="compact">
            <thead>
                <tr>
                    <th class="text-left">Semantic (@id)</th>
                    
                    <th class="text-left">Term</th>
                    <th class="text-left">Source</th>
                    <th class="text-left">Type (@type)</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in contextTableItems" :key="item.name">
                    
                    <!-- <td :style="`background-color: ${item.backgroundColor}; color: ${item.color}`">{{ item.term }}</td>
                    <td :style="`background-color: ${item.backgroundColor}; color: ${item.color}`">{{ item.semantic }}</td>
                    <td :style="`background-color: ${item.backgroundColor}; color: ${item.color}`">{{ item.type }}</td> -->
                    <td v-if="item.semantic !== null && !Object.keys(coincidentSemantics).includes(item.semantic)">{{ item.semantic }}</td>
                    <td v-if="Object.keys(coincidentSemantics).includes(item.semantic)" :rowspan="coincidentSemantics[item.semantic]">{{ item.semantic }}</td>

                    <td>{{ item.term }}</td>
                    <!-- <td v-if="item.term === 'geocodigo'" rowspan="2">{{ item.term }}</td>
                    <td v-if="item.term !== 'codigo_municipio' || item.term !== 'geocodigo'">{{ item.term }}</td> -->
                    
                    

                    <td>{{ item.source }}</td>
                    <td>{{ item.type }}</td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>

<style scoped>
.container {
    margin: 10px 255px;
}
.url-input {
    margin: 10px;
}
.execute-btn {
    margin: 10px auto;
}
.form {
    /* border: solid black 2px; */
    /* border-radius: 5px; */
    display: flex;;
    flex-direction: column;
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
    /* background-color: aqua; */
    vertical-align: middle;
    margin: auto 0 auto 10px;
}
</style>