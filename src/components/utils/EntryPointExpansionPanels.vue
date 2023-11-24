<script setup lang="ts">
import { watch } from 'vue';
// @ts-ignore
import CollectionExpansionPanels from './CollectionExpansionPanels.vue'
import { useGlobalStore, type NavigationEndPoints } from '@/stores/GlobalStore';
import HyperResourceContext from '@/models/HyperResourceContext';
import { storeToRefs } from 'pinia';

const globalStore = useGlobalStore()
const { navigationEntryPointsLoaded, navigationEndPointsLoaded } = storeToRefs<any>(globalStore)

watch(navigationEntryPointsLoaded, () => {
    // console.log(navigationEntryPointsLoaded.value)
})
watch(navigationEndPointsLoaded, () => {
    // console.log(navigationEndPointsLoaded.value)
})

</script>
<template>    
    <v-expansion-panels v-for="entryPointUrl in Object.keys(navigationEntryPointsLoaded)" :key="entryPointUrl">    
        <v-expansion-panel>
            <v-expansion-panel-title>{{ entryPointUrl }}</v-expansion-panel-title>
            <v-expansion-panel-text>
                <collection-expansion-panels :collectionsLinks="navigationEntryPointsLoaded[entryPointUrl]"/>
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