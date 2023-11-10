<script setup>
import MainHeader from './components/MainHeader.vue';
import LinkSources from './components/LinkSources.vue';
import NavigationDrawer from './components/navigation/NavigationDrawer.vue';
import TemplateMap from './components/maps/TemplateMap.vue'
import { useGlobalStore } from "@/stores/GlobalStore"
const globalStore = useGlobalStore()
</script>

<template>
    <MainHeader />

    <main v-if="globalStore.activeTab==='Home'">
        <TemplateMap />
    </main>

    <main v-if="globalStore.activeTab==='Link Sources'">
        <LinkSources />
    </main>
    <NavigationDrawer /> 
    
    
</template>

<style scoped>
main {
    width: 100%;
}
</style>
