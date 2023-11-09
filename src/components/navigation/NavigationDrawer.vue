<script>
import { useGlobalStore } from "@/stores/GlobalStore";

export default {
    data () {
        return {
            drawer: true,
            rail: true,
            activeTab: "home",
            globalStore: useGlobalStore()
        }
    },
    methods: {
        getActiveTabName() {
            return `Linked Map`// | ${this.activeTab}
        },
        // setActiveTabName(tabName) {
        //     console.log(tabName)
        //     // globalStore.setActiveTab()
        // }
    }
}
</script>
<template>
    <v-card>
        <v-layout>
            <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
                <v-list-item class="header-item" prepend-avatar="https://json-ld.org/images/json-ld-data-24.png" :title="getActiveTabName()" nav>
                    <template v-slot:append>
                        <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
                    </template>
                </v-list-item>
  
                <v-divider></v-divider>
  
                <v-list density="compact" nav>
                    <v-list-item prepend-icon="mdi-home-city" title="Home" value="home" @click="globalStore.setActiveTab('Home')"></v-list-item>
                    <v-list-item prepend-icon="mdi-account" title="My Account" value="account" @click="globalStore.setActiveTab('My Account')"></v-list-item>
                    <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users" @click="globalStore.setActiveTab('Users')"></v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-main style="height: 250px"></v-main>
        </v-layout>
    </v-card>
</template>
<style>
.header-item {
    height: 64px;
    margin: auto;
}
</style>