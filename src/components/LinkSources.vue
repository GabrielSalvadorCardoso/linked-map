<script>
// import { reactive, } from 'vue'
import * as jsonld from 'jsonld';
// import SvgIcon from '@jamescoyle/vue-icon';
// import { mdiCheckOutline } from '@mdi/js';

export default {
    name: "LinkSources",
    components: {
        // SvgIcon
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
            contextOpened: undefined
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
        async fetchOptionsToURL(url) {
            
            const data = await this.fetchMetadata(url)
            console.log(data)
            this.urls = this.urls.filter((_url) => _url !== url)
            this.requestedUrls.push(url)
            if(!Object.keys(this.contexts).includes(url))
                this.contexts[url] = data
        },
        openContextViewDialog(url) {
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
            <!-- <div class="url-field">
                <label for="entrypoint-url">EntryPoint URL</label> <br />
                <input type="text" id="entrypoint-url" name="entrypoint-url" v-model="entryPoint.url"/> <br />
            </div> -->
            <v-card-title class="text-subtitle-1">Sugestões</v-card-title>
            <v-card-text>
                http://bcim.geoapi <br />
                http://localhost:8001 <br />
                http://bcim.geoapi/lim-unidade-federacao-a-list <br />
                http://localhost:8001/taxas-rendimento-escolar-por-municipio-list
            </v-card-text>

            <v-text-field class="url-input" persistent-placeholder clearable label="Resource URL" v-model="entryPoint.url" variant="outlined"></v-text-field>
            <!-- <v-btn class="execute-btn" v-on:click="$event => requestEntryPoint()" variant="outlined">Add</v-btn> -->
            <v-btn class="execute-btn" v-on:click="$event => addCurrentURL()" variant="outlined">Add</v-btn>

            <v-list lines="one">
                <v-card-title class="text-subtitle-1">URLs</v-card-title>
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
                            <!-- <template v-slot:activator="{ props }"> -->
                            <!-- <v-btn color="primary">From the bottom</v-btn> -->
                            <!-- </template> -->
                            <!-- <template v-slot:default="{ isActive }"> -->
                                <v-card>
                                    <v-toolbar color="primary" :title="`Context of: ${contextOpened}`"></v-toolbar>
                                    <v-card-text>
                                        <pre>{{ contexts[contextOpened] }}</pre>
                                    </v-card-text>
                                    <v-card-actions class="justify-end">
                                        <v-btn variant="text" @click="contextViewDialogOpen = false">Close</v-btn>
                                    </v-card-actions>
                                </v-card>
                            <!-- </template> -->
                        </v-dialog>
                    </v-col>
                    
                </v-list-item>

                
            </v-list>
            <!-- <svg-icon type="mdi" :path="path"></svg-icon> -->
            <!-- <v-btn class="execute-btn" v-on:click="$event => requestEntryPoint()" variant="outlined">Add</v-btn> -->
            <!-- <button v-on:click="$event => requestEntryPoint()">Executar</button> -->
        </v-card>
        <!-- <pre>{{ entryPoint.data }}</pre>
        <pre>{{ entryPoint.metadata }}</pre>
        <pre>{{ entryPoint.contextualizedData }}</pre> -->
        <!-- <pre>{{ entryPoint.proccessedJSONLD }}</pre> -->
        <pre>{{contexts}}</pre>
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