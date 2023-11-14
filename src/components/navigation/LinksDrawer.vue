<script lang="ts">
// @ts-ignore
import { useGlobalStore } from "@/stores/GlobalStore";
// @ts-ignore
import { LinkinItem } from "@/stores/GlobalStore";
// @ts-ignore
import MergeDataDialog from "../maps/MergeDataDialog.vue";

type LinksDrawerProps = {
    drawer: boolean,
    isMergeDataDialogOpen: boolean,
    rail: boolean,
    globalStore: any
}
export default {
    name: "LinksDrawer",
    components: {
        MergeDataDialog
    },
    data ():LinksDrawerProps {
        return {
            drawer: true,
            rail: true,
            // activeTab: "home",
            globalStore: useGlobalStore(),
            isMergeDataDialogOpen: false
            // sourcesLinks: []
        }
    },
    methods: {
        getActiveTabName() {
            return `Linked Sources`// | ${this.activeTab}
        },
        async mergeData(sourcesLink:LinkinItem[]) {
            this.openMergeDataDialog()
            for(let i=0; i<sourcesLink.length; i++) {
                let response = await this.fetchData(sourcesLink[i].source)
                console.log(response)
            }
            this.closeMergeDataDialog()
        },
        async fetchData (url:string) {
            const resp = await fetch(url)
            const json = await resp.json()
            return json
        },
        openMergeDataDialog() {
            this.isMergeDataDialogOpen = true
        },
        closeMergeDataDialog() {
            this.isMergeDataDialogOpen = false
        }
    },
    watch: {
        'sourcesLinks': function() {
            // console.log(this.sourcesLinks)
        }
    }
}
</script>
<template>
    <v-card>
        <v-layout>
            <v-navigation-drawer location="right" v-model="drawer" :rail="rail" permanent @click="rail = false">
                <v-list-item class="header-item" :title="getActiveTabName()" nav>
                    <template v-slot:append>
                        <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
                    </template>
                </v-list-item>
  
                <!-- <pre>{{ globalStore.sourcesLinks }}</pre> -->
                <v-divider></v-divider>
  
                <v-list density="compact">
                    <v-list-item v-for="sourcesLink in Object.keys(globalStore.sourcesLinks)" :key="sourcesLink">
                        <div class="item-content">
                            <v-list-item-title class="item-title">{{ sourcesLink }}</v-list-item-title>
                            <v-btn icon="mdi-send" @click="($event:any) => mergeData(globalStore.sourcesLinks[sourcesLink])"></v-btn>
                        </div>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
        </v-layout>
        <MergeDataDialog   :isMergeDataDialogOpen="isMergeDataDialogOpen" />
    </v-card>
</template>
<style>
.item-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    vertical-align: middle;
    /* border: #ccc solid 2px; */
}
.item-title {
    /* background-color: aqua; */
    vertical-align: middle;
    margin: auto 0 auto 10px;
}
</style>