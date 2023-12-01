<script setup lang="ts">
// @ts-ignore
import MainHeader from './components/toolbars/MainHeader.vue';
import MainMapToolbar from './components/toolbars/MainMapToolbar.vue';
import LinkSources from './components/workspace/LinkSources.vue';
import ApiNavigation from './components/workspace/ApiNavigation.vue';
// @ts-ignore
import NavigationDrawer from './components/navigation/NavigationDrawer.vue';
import LinksDrawer from './components/navigation/LinksDrawer.vue';
import TemplateMap from './components/maps/TemplateMap.vue'
import { useGlobalStore } from "@/stores/GlobalStore"
const globalStore = useGlobalStore()
</script>

<template>
    
    <main-header v-if="globalStore.activeTab!=='Main Map'" />
    <main-map-toolbar v-if="globalStore.activeTab==='Main Map'" />

    <main v-if="globalStore.activeTab==='Main Map'">
        <TemplateMap />
        <LinksDrawer />
    </main>

    <NavigationDrawer /> 
    <main v-if="globalStore.activeTab==='API Navigation'">
        <api-navigation></api-navigation>
    </main>

    <main v-if="globalStore.activeTab==='Link Sources'">
        <LinkSources />
    </main>

    
</template>

<style scoped>
main {
    width: 100%;
}
</style>
