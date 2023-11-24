<script setup lang="ts">
// @ts-ignore
import MainHeader from './components/workspace/MainHeader.vue';
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
    <MainHeader />

    <NavigationDrawer /> 
    <main v-if="globalStore.activeTab==='API Navigation'">
        <api-navigation></api-navigation>
    </main>

    <main v-if="globalStore.activeTab==='Link Sources'">
        <LinkSources />
    </main>

    <main v-if="globalStore.activeTab==='Main Map'">
        <TemplateMap />
        <LinksDrawer />
    </main>
</template>

<style scoped>
main {
    width: 100%;
}
</style>
