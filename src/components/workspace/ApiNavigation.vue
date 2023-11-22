<script setup lang="ts">
import { ref } from 'vue';
// @ts-ignore
import EntryPointExpansionPanel from '../utils/EntryPointExpansionPanel.vue'

const url = ref("")

import { useGlobalStore, type NavigationEntryPoints } from "@/stores/GlobalStore";
const globalStore = useGlobalStore()

const requestEntryPointMetadata = async () => {
    
    let resp = await fetch(url.value, {
        method: 'OPTIONS'
    })
    
    let json = await resp.json()
    
    let obj:NavigationEntryPoints = {}
    obj[url.value] = json
    globalStore.addNavigationEntryPoint(obj)
}
</script>

<template>
    <div class="container">
        <p> http://bcim.geoapi </p>
        <p> http://localhost:8001 </p>
        <v-text-field class="url-input" persistent-placeholder clearable label="Resource URL" v-model="url" variant="outlined"></v-text-field>
        <v-btn class="execute-btn" v-on:click="($event:any) => requestEntryPointMetadata()" variant="outlined">Add</v-btn>
        <div v-for="navEntryPoint in Object.entries(globalStore.navigationEntryPointsLoaded)" :key="navEntryPoint[0]">
            <entry-point-expansion-panel :title="navEntryPoint[0]" :content="navEntryPoint[1]">
            </entry-point-expansion-panel>
        </div>
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