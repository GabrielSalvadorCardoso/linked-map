<script setup lang="ts">
import { useGlobalStore } from "@/stores/GlobalStore";

const globalStore = useGlobalStore()
const setNavigationDrawerState = (event:any, rail:boolean) => {
    globalStore.setNavigationDrawerState(rail)
}
</script>
<template>
    <v-card >
        <v-layout>
            <v-navigation-drawer location="left" v-bind="globalStore.isNavigationDrawerOpen" :rail="globalStore.navigationDrawerRail" permanent @click="($event:any, rail:boolean) => setNavigationDrawerState($event, false)">
                <v-list-item prepend-avatar="https://json-ld.org/images/json-ld-data-24.png" :title="globalStore.activeTab" nav>
                    <template v-slot:append>
                        <v-btn variant="text" icon="mdi-chevron-left" @click.stop="($event:any, rail:boolean) => setNavigationDrawerState($event, !rail)"></v-btn>
                    </template>
                </v-list-item>
  
                <v-divider></v-divider>
  
                <v-list density="compact" nav>
                    <v-list-item prepend-icon="mdi-api" title="API Navigation" value="users" @click="globalStore.setActiveTab('API Navigation')"></v-list-item>
                    <v-list-item prepend-icon="mdi-source-merge" title="Link Sources" value="account" @click="globalStore.setActiveTab('Link Sources')"></v-list-item>
                    <v-list-item prepend-icon="mdi-google-maps" title="Main Map" value="home" @click="globalStore.setActiveTab('Main Map')"></v-list-item>
                    
                </v-list>
            </v-navigation-drawer>
        </v-layout>
    </v-card>
</template>
<style>
</style>