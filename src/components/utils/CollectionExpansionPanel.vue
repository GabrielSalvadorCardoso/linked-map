<script setup lang="ts">
import HyperResourceContext from '@/models/HyperResourceContext';
import { ref } from 'vue';

interface CollectionExpansionPanelProps {
    title: string,
    context: HyperResourceContext
}
const props = defineProps<CollectionExpansionPanelProps>()
const title = ref(props.title)
const context = ref(props.context)
</script>
<template>
    <v-expansion-panels>
        <v-expansion-panel>
            <v-expansion-panel-title>{{ title }}</v-expansion-panel-title>
            <v-expansion-panel-text>
                <v-tooltip :text="title" location="center">
                    <template v-slot:activator="{ open }">
                        <v-list-item v-bind="open">                                
                            <div class="item-content">
                                <v-card title="hr:supportedProperties"                                       
                                        variant="outlined">
                                    <!-- <div> -->
                                        <pre>{{ context._supportedProperties }}</pre>
                                    <!-- </div> -->
                                    <!-- <v-card-actions>
                                        <v-btn>Click me</v-btn>
                                    </v-card-actions> -->
                                </v-card>
                                <v-card title="hr:supportedOperations"
                                        subtitle="Subtitle"
                                        text="..."
                                        variant="outlined">
                                    <v-card-actions>
                                        <v-btn>Click me</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </div>                                
                        </v-list-item>
                    </template>
                </v-tooltip>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>
<style>
.item-content {
    display: flex;
    flex-direction: row;
    /* justify-content: space-between; */
    vertical-align: middle;
    border-bottom: #ccc solid 2px;
}
.item-info {
    display: flex;
    flex-direction: row;
    vertical-align: middle;
}
.item-icon {
    margin: auto 2px;
}
</style>