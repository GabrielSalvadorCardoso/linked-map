<script>
import { useGlobalStore } from "@/stores/GlobalStore";

export default {
    data () {
        return {
            // drawer: true,
            // rail: true,
            globalStore: useGlobalStore()
        }
    },
    methods: {
        setNavigationDrawerState(event, rail) {
            
            let drawerCard = document.getElementById('drawerCard');
            if(drawerCard) {
                console.log(drawerCard.offsetWidth, rail)
            }
            
            this.globalStore.setNavigationDrawerState(rail)
        }
    }
}
</script>
<template>
    <v-card >
        <v-layout>
            <v-navigation-drawer id="drawerCard" v-bind="globalStore.isNavigationDrawerOpen" :rail="globalStore.navigationDrawerRail" permanent @click="($event, rail) => setNavigationDrawerState(event, false)">
                <v-list-item class="header-item" prepend-avatar="https://json-ld.org/images/json-ld-data-24.png" :title="globalStore.activeTab" nav>
                    <template v-slot:append>
                        <v-btn variant="text" icon="mdi-chevron-left" @click.stop="($event, rail) => setNavigationDrawerState($event, !rail)"></v-btn>
                    </template>
                </v-list-item>
  
                <v-divider></v-divider>
  
                <v-list density="compact" nav>
                    <v-list-item prepend-icon="mdi-google-maps" title="Home" value="home" @click="globalStore.setActiveTab('Main Map')"></v-list-item>
                    <v-list-item prepend-icon="mdi-source-merge" title="Link Sources" value="account" @click="globalStore.setActiveTab('Link Sources')"></v-list-item>
                    <!-- <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users" @click="globalStore.setActiveTab('Users')"></v-list-item> -->
                </v-list>
            </v-navigation-drawer>
            <!-- <v-main style="height: 250px"></v-main> -->
        </v-layout>
    </v-card>
</template>
<style>
.header-item {
    height: 64px;
    margin: auto;
}
</style>