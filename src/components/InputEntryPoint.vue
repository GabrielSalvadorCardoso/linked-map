<script setup>
import { ref, reactive, onMounted } from 'vue'
import * as jsonld from 'jsonld';
// const entryPointUrl = ref("")
const entryPoint = reactive({
    url: "http://bcim.geoapi",
    data: {},
    metadata: {},
    contextualizedData: {},
    proccessedJSONLD: {}
})

onMounted(async () => {
    // console.log(await fetchData())
    // console.log(await fetchEntryPoint())
})

const mergeDataWithDescription = (data, metadata) => {
    return new Promise((resolve, reject) => {
        try {
            resolve({...data, ...metadata});
        } catch (err) {
            reject(err);
        }
    })
}

const requestEntryPoint = async () => {
    event.preventDefault()
    fetchEntryPointMetadata()
    .then((metadata) => {
        fetchEntryPoint()
        .then((data) => {
            mergeDataWithDescription(data, metadata)
            .then((contextualizedData) => {
                // console.log(contextualizedData)
                jsonld.expand(contextualizedData)
                .then((proccessedJSONLD) => {
                    // console.log(proccessedJSONLD)
                    entryPoint.proccessedJSONLD = proccessedJSONLD
                })
            })
        })
        
    })
    
    // entryPoint.data = data
    // entryPoint.metadata = metadata
    // entryPoint.contextualizedData = {...data, ...metadata}
    // entryPoint.proccessedJSONLD = proccessedJSONLD
    
    
}

const fetchEntryPoint = async () => {
    console.log(entryPoint.url)
    const resp = await fetch(entryPoint.url)
    const json = await resp.json()
    return json
}

const fetchEntryPointMetadata = async () => {
    const resp = await fetch(entryPoint.url, {
        method: 'OPTIONS'
    })
    const json = await resp.json()
    return json
}

</script>

<template>
    <div>
        <form>
            <div class="url-field">
                <label for="entrypoint-url">EntryPoint URL</label> <br />
                <input type="text" id="entrypoint-url" name="entrypoint-url" v-model="entryPoint.url"/> <br />
            </div>
            <button v-on:click="$event => requestEntryPoint()">Executar</button>
        </form>
        <!-- <pre>{{ entryPoint.data }}</pre>
        <pre>{{ entryPoint.metadata }}</pre>
        <pre>{{ entryPoint.contextualizedData }}</pre> -->
        <!-- <pre>{{ entryPoint.proccessedJSONLD }}</pre> -->
    </div>
</template>

<style scoped>
form {
    border: solid black 2px;
    border-radius: 5px;
    display: flex;;
    flex-direction: column;
}
form button {
    background-color: #00F;
    color: #FFF;
    padding: 5px;
    border-radius: 5px;
    margin: 5px auto 5px auto;
}
.url-field {
    display: flex;
    flex-direction: row;
    margin: auto;
}
.url-field input {
    border: solid #000 1px;
}
</style>