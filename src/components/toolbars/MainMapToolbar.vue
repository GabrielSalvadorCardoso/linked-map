<script setup lang="ts">
import { useGlobalStore } from "@/stores/GlobalStore";
import AddInformationLayersDialog from "../dialogs/AddInformationLayersDialog.vue";
import { ref } from "vue";
const globalStore = useGlobalStore();
const isAddInformationLayerDialogOpen = ref(false)
const openAddInformationLayerDialog = () => {
    isAddInformationLayerDialogOpen.value = true
}

const closeAddInformationLayerDialog = () => {
    isAddInformationLayerDialogOpen.value = false
}
</script>
<template>
    
    <div class="container">
        <v-card flat>
            
            <v-toolbar flat>
                <v-spacer></v-spacer>
                <v-btn variant="outlined" append-icon="mdi-layers-plus" @click="openAddInformationLayerDialog()">Add Information Layer</v-btn>
                <v-spacer></v-spacer>
            </v-toolbar>

            <v-divider></v-divider>
            
        </v-card>

        <add-information-layers-dialog :isAddInformationLayerDialogOpen="isAddInformationLayerDialogOpen"
                                        v-on:closeAddInformationLayerDialog="closeAddInformationLayerDialog" />
    </div>
</template>
<style>
.container {
    /* margin: 10px 255px; */
    margin-left: v-bind('globalStore.mainContentMarginLeft');
    margin-right: v-bind('globalStore.mainContentMarginRight');
    /* margin-right: ; */
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.text-grey {
    margin-left: 200px;
}
</style>