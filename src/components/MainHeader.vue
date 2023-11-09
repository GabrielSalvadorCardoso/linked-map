<script setup>
import { useGlobalStore } from "@/stores/GlobalStore"
// import { storeToRefs } from "pinia"
// const { activeTab } = storeToRefs(useGlobalStore())
const globalStore = useGlobalStore()
</script>

<template>
    <div class="container">
        <v-toolbar :title="`Linked Map | ${globalStore.activeTab}`"></v-toolbar>
    </div>
</template>

<style scoped>
.container {
    /* height: 56px; */
    text-align: center;
}
.container v-toolbar-title {
    margin: auto;
}
</style>