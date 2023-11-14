<script setup>
import MainHeader from './components/MainHeader.vue';
import LinkSources from './components/LinkSources.vue';
import NavigationDrawer from './components/navigation/NavigationDrawer.vue';
import LinksDrawer from './components/navigation/LinksDrawer.vue';
import TemplateMap from './components/maps/TemplateMap.vue'
import { useGlobalStore } from "@/stores/GlobalStore"
const globalStore = useGlobalStore()
</script>

<template>
    <MainHeader />

    <NavigationDrawer /> 
    <main v-if="globalStore.activeTab==='Main Map'">
        <TemplateMap />
        <LinksDrawer />
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
