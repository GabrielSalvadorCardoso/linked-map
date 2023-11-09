<script setup>
import { reactive } from 'vue'
const navigationDrawer = reactive({
    drawer: false,
    group: null
})

const toggleDrawer = () => {
    event.preventDefault()
    // navigationDrawer.drawer = !navigationDrawer.drawer
    navigationDrawer.drawer = true
    console.log(navigationDrawer)
}
const handleDrawerGroup = () => {
    event.preventDefault()
}

</script>
<template>
    <v-app>
        <v-card class="mx-auto overflow-hidden" height="400">
            <v-app-bar color="deep-purple" dark >
                <v-app-bar-nav-icon v-on:click="$event => toggleDrawer()"></v-app-bar-nav-icon>
                <v-toolbar-title>Linked Map</v-toolbar-title>
            </v-app-bar>
        
            <v-navigation-drawer v-model="navigationDrawer.drawer" absolute temporary>
                <v-list nav dense>
                    <v-list-item-group v-model="navigationDrawer.group" active-class="deep-purple--text text--accent-4">
                        <v-list-item>
                            <!-- <v-list-item-icon>
                                <v-icon>mdi-home</v-icon>
                            </v-list-item-icon> -->
                            <v-list-item-title>Home</v-list-item-title>
                        </v-list-item>
        
                        <v-list-item>
                            <!-- <v-list-item-icon>
                                <v-icon>mdi-account</v-icon>
                            </v-list-item-icon> -->
                            <v-list-item-title>Account</v-list-item-title>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-navigation-drawer>
        </v-card>
    </v-app>
</template>