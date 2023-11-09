<script setup>
    import MainHeader from './components/MainHeader.vue';
    import InputEntryPoint from './components/InputEntryPoint.vue';
    import NavigationDrawer from './components/navigation/NavigationDrawer.vue';
    import TemplateMap from './components/maps/TemplateMap.vue'
</script>

<template>
    <MainHeader />
    <NavigationDrawer /> 
    
    <InputEntryPoint />

    <TemplateMap />
    <!-- <GeoJsonDemo /> -->

    <main></main>
</template>

<style scoped>
header {
    line-height: 1.5;
}
</style>
