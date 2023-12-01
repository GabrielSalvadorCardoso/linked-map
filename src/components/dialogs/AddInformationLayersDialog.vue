<script setup lang="ts">
import { ref, watch } from 'vue';
import HyperResourceContext from "../../models/HyperResourceContext"
import HyperResourceSupportedProperty from "../../models/HyperResourceSupportedProperty"
interface AddInformationLayersDialogProps {
    isAddInformationLayerDialogOpen: boolean
}
const props = defineProps<AddInformationLayersDialogProps>()
const isDialogOpen = ref(props.isAddInformationLayerDialogOpen)
const operationConfirmed = ref(false)
const propertyConfirmed = ref(false)
const operatorConfirmed = ref(false)

const selectedOperation = ref()
const loaded = ref(false)
const loading = ref(false)
const loadedContext = ref({}) //HyperResourceContext
const buildedURL = ref("")
const currentURL = ref("http://bcim.geoapi/loc-capital-p-list")
const operators = ref([
    {
        term: '=',
        semantic: 'https://schema.org/equal'
    },
    {
        term: '>',
        semantic: 'https://schema.org/greater'
    },
    {
        term: '<',
        semantic: 'https://schema.org/lesser'
    },
    {
        term: '>=',
        semantic: 'https://schema.org/greaterOrEqual'
    },
    {
        term: '<=',
        semantic: 'https://schema.org/lesserOrEqual'
    },
    {
        term: '<>',
        semantic: 'https://schema.org/nonEqual'
    },
])
const operatorProps = (item:any) => {
    return {
        title: item.term,
        subtitle: item.semantic,
    }
}
const propertyData = (item:HyperResourceSupportedProperty) => {
    let _subtitle = loadedContext.value._context[item._property]
    if(_subtitle === undefined) {
        _subtitle = ""
    }
    return {
        title: item._property,
        subtitle: _subtitle
    }
}
watch(() => props.isAddInformationLayerDialogOpen, () => {
    isDialogOpen.value = props.isAddInformationLayerDialogOpen
})
const emit = defineEmits(["closeAddInformationLayerDialog"])

const registerCurrentRequest = () => {
    emit('closeAddInformationLayerDialog')
}

const onClick = async () => {
    loading.value = true
    loaded.value = false

    try {
        let resp = await fetch(currentURL.value, {
            method: 'OPTIONS'
        })
        let json = await resp.json()
    
        loadedContext.value = HyperResourceContext.build(currentURL.value, json)
        buildedURL.value = currentURL.value

        // {
        //     "@type": "hr:SupportedProperty",
        //     "hydra:property": "nome",
        //     "hydra:required": false,
        //     "hydra:readable": true,
        //     "hydra:writable": true,
        //     "hr:isExternal": false
        // }
        // "nome": "schema:Text"
    } catch(error) {
        console.log("Unable to access given URL")
    } finally {
        loading.value = false
        loaded.value = true
    }    
}
const getSupportedPropertyRadioButtonLabel = (property:string) => {
    if(loadedContext.value._context[property]) {
        return `${property} (${loadedContext.value._context[property]})`
    } else {
        return property
    }   
}
const getSupportedOperationRadioButtonLabel = (appendPath:string) => {
    let operationName = ""
    if(appendPath.startsWith("/")){
        operationName = appendPath.slice(1)
    }
    operationName = operationName.split("/")[0]
    return operationName
    
}
</script>
<template>
<template>
    <v-row justify="center">
        <v-dialog persistent transition="dialog-top-transition" scrim v-model="isDialogOpen">
            <v-card>
                <v-toolbar color="#3F51B5" title="Insert and explore a URLs"></v-toolbar>
                <v-card-text>
                    <v-container>
                        <v-row>

                            <v-col cols="12">
                                <v-card class="mx-auto" color="grey-lighten-3">
                                        <v-text-field   :loading="loading"
                                                        density="compact"
                                                        variant="solo"
                                                        label="URL*"
                                                        v-model="currentURL"
                                                        required
                                                        append-inner-icon="mdi-magnify"
                                                        single-line
                                                        hide-details
                                                        @click:append-inner="onClick">
                                        </v-text-field>
                                </v-card>
                            </v-col>

                            <v-col cols="12">
                                <v-container fluid v-if="loadedContext._supportedOperations && loadedContext._supportedOperations.length">
                                    <v-card title="hr:supportedOperations" variant="outlined">
                                        <v-radio-group v-model="selectedOperation">
                                            <v-table fixed-header height="300px">
                                                <thead>
                                                    <tr>
                                                        <th>Operation</th>                                                        
                                                        <th class="text-left">Append Path</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    
                                                    <tr v-for="supOper in loadedContext._supportedOperations" :key="supOper._appendPath">
                                                        <td>
                                                            <v-radio    :label="getSupportedOperationRadioButtonLabel(supOper._appendPath)"
                                                                        :value="getSupportedOperationRadioButtonLabel(supOper._appendPath)">
                                                            </v-radio>
                                                        </td>
                                                        
                                                        <td>{{ supOper._appendPath }}</td>
                                                    </tr>
                                                </tbody>
                                            </v-table>
                                        </v-radio-group>
                                        <v-card-actions class="operation-actions">
                                            <v-btn-toggle v-bind="operationConfirmed" color="primary" >
                                                <v-btn @click="operationConfirmed = false" icon="mdi-cancel"></v-btn>
                                                <v-btn @click="operationConfirmed = true" icon="mdi-check"></v-btn>
                                            </v-btn-toggle>
                                        </v-card-actions>
                                    </v-card>
                                </v-container>                                
                            </v-col>

                            <v-col cols="12" sm="4" v-if="loadedContext._supportedProperties && loadedContext._supportedProperties.length">
                                <v-select :disabled="propertyConfirmed" label="Property" required :items="loadedContext._supportedProperties" :item-props="propertyData"></v-select>
                            </v-col>

                            <v-col cols="12" sm="2" v-if="loadedContext._supportedProperties && loadedContext._supportedProperties.length">
                                <v-btn-toggle v-bind="propertyConfirmed" color="primary" >
                                    <v-btn @click="propertyConfirmed = false" icon="mdi-cancel"></v-btn>
                                    <v-btn @click="propertyConfirmed = true" icon="mdi-check"></v-btn>
                                </v-btn-toggle>
                            </v-col>
                            
                            <v-col cols="12" sm="4" v-if="loadedContext._supportedOperations && loadedContext._supportedOperations.length">
                                <v-select :disabled="operatorConfirmed" label="Operator" required :items="operators" :item-props="operatorProps"></v-select>
                            </v-col>
                            <v-col cols="12" sm="2" v-if="loadedContext._supportedOperations && loadedContext._supportedOperations.length">
                                <v-btn-toggle v-bind="operatorConfirmed" color="primary" >
                                    <v-btn @click="operatorConfirmed = false" icon="mdi-cancel"></v-btn>
                                    <v-btn @click="operatorConfirmed = true" icon="mdi-check"></v-btn>
                                </v-btn-toggle>
                            </v-col>
                            
                            <v-col cols="12">
                                <v-text-field readonly label="Build URL by selecting options above" :model-value="buildedURL"></v-text-field>
                            </v-col>
                        
                        </v-row>
                    </v-container>
                </v-card-text>
        <v-card-actions class="justify-end">
            <v-btn variant="text" @click="emit('closeAddInformationLayerDialog')">Close</v-btn>
            <v-btn variant="text" @click="registerCurrentRequest()">Save</v-btn>
        </v-card-actions>
      </v-card>
            
        </v-dialog>
    </v-row>
</template>
</template>
<style>
.operation-actions {
    justify-content: center;
}
</style>