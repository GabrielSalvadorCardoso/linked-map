<script setup lang="ts">
import { ref, watch } from 'vue';
import HyperResourceContext from "../../models/HyperResourceContext"
import HyperResourceSupportedProperty from "../../models/HyperResourceSupportedProperty"
import type HyperResourceSupportedOperation from '@/models/HyperResourceSupportedOperation';
import HyperResourceUtils from '@/models/HyperResourceUtils';
import { useGlobalStore } from "@/stores/GlobalStore";
import { LMap, LTileLayer, LGeoJson } from "@vue-leaflet/vue-leaflet";
const globalStore = useGlobalStore();
const CONTENT_TYPE_GEOJSON = "application/geo+json"
// @ts-ignore
import Internationalization from "../../utils/Internationalization";
interface AddInformationLayersDialogProps {
    isAddInformationLayerDialogOpen: boolean
}
type Operator = {
    term: string,
    semantic: string
}
const FILTER_OPERATION_NAME = 'filter'
const FILTER_OPERATION_PREFIX = `/${FILTER_OPERATION_NAME}/`

const props = defineProps<AddInformationLayersDialogProps>()
const isDialogOpen = ref(props.isAddInformationLayerDialogOpen)
const operationConfirmed = ref<boolean>(false)
const propertyConfirmed = ref<boolean>(false)
const operatorConfirmed = ref<boolean>(false)
const valueConfirmed = ref<boolean>(false)

const selectedOperation = ref("")
const selectedProperty = ref<HyperResourceSupportedProperty>()
const selectedOperator = ref<Operator>()
const operationParamToFillIdx = ref<number|null>(null)

const loaded = ref(false)
const loading = ref(false)
const loadedContext = ref<HyperResourceContext>() //HyperResourceContext
const visualizedContext = ref<HyperResourceContext>()
const buildedURL = ref("")
const currentValue = ref()
const currentURL = ref("http://bcim.geoapi/lim-unidade-federacao-a-list")

const visualizedData = ref()
const visualizedDataIsGeo = ref<boolean>(false)

// https://ej2.syncfusion.com/vue/documentation/dialog/how-to/add-a-minimize-maximize-buttons
const operators= ref<Operator[]>([
    // {
    //     term: '=',
    //     semantic: 'https://schema.org/equal'
    // },
    // {
    //     term: '>',
    //     semantic: 'https://schema.org/greater'
    // },
    // {
    //     term: '<',
    //     semantic: 'https://schema.org/lesser'
    // },
    // {
    //     term: '>=',
    //     semantic: 'https://schema.org/greaterOrEqual'
    // },
    // {
    //     term: '<=',
    //     semantic: 'https://schema.org/lesserOrEqual'
    // },
    // {
    //     term: '<>',
    //     semantic: 'https://schema.org/nonEqual'
    // },
])
const operatorProps = (item:any) => {
    return {
        title: item.term,
        subtitle: item.semantic,
    }
}
const propertyData = (item:HyperResourceSupportedProperty) => {
    let _subtitle = ""
    if(loadedContext.value) {
        _subtitle = loadedContext.value._context[item._property]
        if(_subtitle === undefined) {
            _subtitle = ""
        }
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
        
        operationConfirmed.value = false
        selectedOperation.value = ""
        operationParamToFillIdx.value = null
    } catch(error) {
        console.log("Unable to access given URL")
    } finally {
        loading.value = false
        loaded.value = true
    }    
}

// supported operations functions
const getSupportedOperationRadioButtonLabel = (appendPath:string) => {
    let operationName = ""
    if(appendPath.startsWith("/")){
        operationName = appendPath.slice(1)
    }
    operationName = operationName.split("/")[0]
    return operationName
    
}

const buildFilterOperators = (filterOperation:HyperResourceSupportedOperation):Operator[] => {
    let operators:Operator[]  = []
    let expects:string[] = []
    for(let k=0; k<filterOperation._parameters.length; k++) {
        expects.push(filterOperation._parameters[k]._expects)
    }
    expects = expects.filter((exp:string) => Object.keys((loadedContext.value as HyperResourceContext)._context).includes(exp))
    operators = expects.map((exp:string) => {
        return {term: exp, semantic: (loadedContext.value as HyperResourceContext)._context[exp]}
    })
                        
    return operators
}

const getSupportedOperationByRadioButtonLabel = (label:string):HyperResourceSupportedOperation => {
    return (loadedContext.value as HyperResourceContext)._supportedOperations.find((supOper:HyperResourceSupportedOperation) => supOper._appendPath.startsWith(`/${label}/`)) as HyperResourceSupportedOperation
}

const confirmCurrentOperation = () => {
    if(selectedOperation.value) {
        operationConfirmed.value = true
        let supOper = getSupportedOperationByRadioButtonLabel(selectedOperation.value)
        if(supOper._appendPath.startsWith(FILTER_OPERATION_PREFIX)) { // HARDCODED
            operators.value = buildFilterOperators(supOper)
        }
        buildedURL.value = buildedURL.value + supOper._appendPath
        if(supOper._parameters.length > 0) {
            operationParamToFillIdx.value = 0
        }
    }
}

const cancelCurrentOperation = () => {
    buildedURL.value = currentURL.value
    operationConfirmed.value = false
    propertyConfirmed.value = false
    selectedProperty.value = undefined
    selectedOperation.value = ""
    operationParamToFillIdx.value = null
    operatorConfirmed.value = false
    selectedOperator.value = undefined
}

const showOperationsInput = () => {
    return loadedContext.value && loadedContext.value._supportedOperations && loadedContext.value._supportedOperations.length
}

const currentOperationNeedsToBeFilledWithProperty = ():boolean => {
    let curSupOperation = getSupportedOperationByRadioButtonLabel(selectedOperation.value)
    for(let i=0; i<curSupOperation._parameters.length; i++) {
        if(curSupOperation._parameters[i]._expects === HyperResourceUtils.HYPER_RESOURCE_SUPPORTED_PROPERTY_KEYWORD) {
            return true
        }
    }
     
    return false
}

// supported properties functions
const confirmCurrentProperty = () => {
    if(selectedProperty.value) {
        propertyConfirmed.value = true
        let supOper = getSupportedOperationByRadioButtonLabel(selectedOperation.value)
        let paramLabel = `{param${operationParamToFillIdx.value}}`
        buildedURL.value = `${buildedURL.value.replace(paramLabel, selectedProperty.value._property)}`
        if(supOper._parameters.length > 0) {
            operationParamToFillIdx.value = (operationParamToFillIdx.value as number)+1
        } else {
            operationParamToFillIdx.value = null
        }
    }
}

const cancelCurrentProperty = () => {
    operationParamToFillIdx.value = (operationParamToFillIdx.value as number)-1
    buildedURL.value = buildedURL.value.replace(`/${(selectedProperty.value as HyperResourceSupportedProperty)._property}`, `/{param${operationParamToFillIdx.value}}`)
    propertyConfirmed.value = false
    selectedProperty.value = undefined
}

const showPropertiesInput = () => {
    if(!showOperationsInput()) {
        return false
    }
    const _showPropertiesInput = (        
        operationConfirmed.value &&
        loadedContext &&
        currentOperationNeedsToBeFilledWithProperty() &&
        (loadedContext.value as HyperResourceContext)._supportedProperties &&
        (loadedContext.value as HyperResourceContext)._supportedProperties.length
    )
    return _showPropertiesInput
}


// operators
const showOperatorsInput = () => {
    if(!showPropertiesInput()) {
        return false
    }
    let _showOperatorsInput = (
        operationConfirmed.value &&
        propertyConfirmed.value &&
        selectedOperation.value === FILTER_OPERATION_NAME &&
        loadedContext &&
        (loadedContext.value as HyperResourceContext)._supportedOperations &&
        (loadedContext.value as HyperResourceContext)._supportedOperations.length
    )
    return _showOperatorsInput
}

const confirmCurrentOperator = () => {
    if(selectedOperator.value) {
        operatorConfirmed.value = true
        let supOper = getSupportedOperationByRadioButtonLabel(selectedOperation.value)
        let paramLabel = `{param${operationParamToFillIdx.value}}`
        buildedURL.value = `${buildedURL.value.replace(paramLabel, selectedOperator.value.term)}`
        if(operationParamToFillIdx.value && supOper._parameters.length-1 > operationParamToFillIdx.value) {
            operationParamToFillIdx.value = (operationParamToFillIdx.value as number)+1
        } else {
            operationParamToFillIdx.value = null
        }
    }
}

const resetOperator = () => {
    operationParamToFillIdx.value = (operationParamToFillIdx.value as number)-1
    buildedURL.value = buildedURL.value.replace(`/${(selectedOperator.value as Operator).term}`, `/{param${operationParamToFillIdx.value}}`)
}

const cancelCurrentOperator = () => {
    resetOperator()
    // propertyConfirmed.value = false
    // selectedProperty.value = undefined
    operatorConfirmed.value = false
    selectedOperator.value = undefined
}

// value
const showValueInput = () => {
    return operationConfirmed.value === true
}

const confirmCurrentValue = () => {
    if(currentValue.value) {
        valueConfirmed.value = true
        let supOper = getSupportedOperationByRadioButtonLabel(selectedOperation.value)
        let paramLabel = `{param${operationParamToFillIdx.value}}`
        buildedURL.value = `${buildedURL.value.replace(paramLabel, currentValue.value)}`
        if(supOper._parameters.length > 0) {
            operationParamToFillIdx.value = (operationParamToFillIdx.value as number)+1
        } else {
            operationParamToFillIdx.value = null
        }
    }
}

const cancelCurrentValue = () => {

}

// preview actions
const previewResult = async () => {
    await fetch(buildedURL.value, {

    })
    try {
        let resp = await fetch(buildedURL.value)//, {
        //     method: 'OPTIONS'
        // })
        let json = await resp.json()
        // visualizedContext.value = HyperResourceContext.build(currentURL.value, json)
        visualizedData.value = json
        if(resp.headers.get("content-type") === CONTENT_TYPE_GEOJSON) {
            visualizedDataIsGeo.value = true
        } else {
            visualizedDataIsGeo.value = false
        }
        
                
    } catch(error) {
        console.log("Unable to access given URL")
    } finally {
        // loading.value = false
        // loaded.value = true
    } 
}

const showDataVisualizer = () => {
    return visualizedData.value !== undefined
}

const getGeoData = () => {
    
    return visualizedData.value["features"][0]
    
}

</script>
<template>
<template>
    <v-row justify="center">
        <v-dialog persistent scrollable transition="dialog-top-transition" scrim v-model="isDialogOpen">
            <v-card>
                <v-toolbar color="#3F51B5" :title="Internationalization.getLocaleString('addInformationLayerDialogTitle', globalStore.idiom)"></v-toolbar>
                <v-card-text>
                    <v-container>
                        <v-row class="ma-5">
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
                        </v-row>

                        <v-row class="ma-3" v-if="showOperationsInput()">
                            <v-col cols="12">
                                <v-card :title="Internationalization.getLocaleString('supportedOperationsTableTitle', globalStore.idiom)" variant="outlined" v-if="showOperationsInput()">
                                    <v-radio-group :disabled="operationConfirmed" v-model="selectedOperation">
                                        <v-table fixed-header density="compact" height="200px">
                                            <thead>
                                                <tr>
                                                    <th class="text-left">{{ (loadedContext as HyperResourceContext)._supportedOperations[0]._type }}</th>                                                        
                                                    <th class="text-left">
                                                        {{ Internationalization.getLocaleString("supportedOperationsTableMethod", globalStore.idiom) }}
                                                        
                                                    </th>
                                                    <th class="text-left">
                                                        {{ Internationalization.getLocaleString("supportedOperationsTableAppendPath", globalStore.idiom) }}
                                                        
                                                    </th>                                                        
                                                    <th class="text-left">
                                                        {{ Internationalization.getLocaleString("supportedOperationsTablePossibleStatus", globalStore.idiom) }}
                                                        
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                
                                                <tr v-for="supOper in (loadedContext as HyperResourceContext)._supportedOperations" :key="supOper._appendPath">
                                                    <td>
                                                        <v-radio    :label="getSupportedOperationRadioButtonLabel(supOper._appendPath)"
                                                                    :value="getSupportedOperationRadioButtonLabel(supOper._appendPath)">
                                                        </v-radio>
                                                    </td>

                                                    <td>{{ supOper._method }}</td>
                                                    
                                                    <td>{{ supOper._appendPath }}</td>
                                                    
                                                    <td>{{ supOper._possibleStatus.join(",") }}</td>
                                                </tr>
                                            </tbody>
                                        </v-table>
                                    </v-radio-group>
                                    <v-card-actions class="operation-actions">
                                        <v-btn-toggle v-model="operationConfirmed" color="primary" >
                                            <v-btn @click="cancelCurrentOperation" :disabled="!operationConfirmed" icon="mdi-cancel"></v-btn>
                                            <v-btn @click="confirmCurrentOperation" :disabled="operationConfirmed || selectedOperation === ''" icon="mdi-check"></v-btn>
                                        </v-btn-toggle>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>

                        <v-row class="ma-6 row" dense no-gutters justify="space-around" align-content="center">
                            <v-col cols="5" v-if="showPropertiesInput()">
                                <div class="selectionControls">
                                    <v-select   hide-details
                                                variant="outlined"
                                                :disabled="propertyConfirmed"
                                                :label="Internationalization.getLocaleString('propertyLabel', globalStore.idiom)"
                                                v-model="selectedProperty"
                                                required
                                                :items="(loadedContext as HyperResourceContext)._supportedProperties" :item-props="(propertyData as any)">
                                        </v-select>
                                    <v-btn-toggle class="controls" v-model="propertyConfirmed" color="primary" >
                                        <v-btn @click="cancelCurrentProperty" :disabled="!propertyConfirmed" icon="mdi-cancel"></v-btn>
                                        <v-btn @click="confirmCurrentProperty" :disabled="propertyConfirmed || selectedProperty === undefined" icon="mdi-check"></v-btn>
                                    </v-btn-toggle>
                                </div>
                            </v-col>
                            
                            <v-col cols="5" v-if="showOperatorsInput()">
                                <div class="selectionControls">
                                    <v-select   variant="outlined"
                                                v-if="showOperatorsInput()"
                                                :disabled="operatorConfirmed"
                                                :label="Internationalization.getLocaleString('operatorLabel', globalStore.idiom)"
                                                v-model="selectedOperator"
                                                required
                                                :items="operators"
                                                :item-props="operatorProps">
                                    </v-select>
                                    <v-btn-toggle class="controls" v-model="operatorConfirmed" color="primary" v-if="showOperatorsInput()">
                                        <v-btn @click="cancelCurrentOperator" :disabled="!operatorConfirmed" icon="mdi-cancel"></v-btn>
                                        <v-btn @click="confirmCurrentOperator" :disabled="operatorConfirmed || selectedOperator === undefined" icon="mdi-check"></v-btn>
                                    </v-btn-toggle>
                                </div>
                            </v-col>
                        </v-row>

                        <v-row class="ma-6 row" dense no-gutters justify="space-around" align-content="center">
                            <v-col v-if="showValueInput()">
                                <div class="selectionControls">
                                    <v-text-field   class="valueInput"
                                                    variant="underlined"
                                                    :label="Internationalization.getLocaleString('insertValueLabel', globalStore.idiom)"
                                                    v-model="currentValue">
                                    </v-text-field>
                                    <v-btn-toggle v-model="valueConfirmed" color="primary" >
                                        <v-btn @click="cancelCurrentValue" :disabled="!valueConfirmed" icon="mdi-cancel"></v-btn>
                                        <v-btn @click="confirmCurrentValue" :disabled="valueConfirmed || currentValue === undefined" icon="mdi-check"></v-btn>
                                    </v-btn-toggle>
                                </div>
                            </v-col>
                        </v-row>

                        <v-row class="ma-6" dense no-gutters justify="space-around" align-content="center">
                            <v-col cols="12">
                                <div class="selectionControls">
                                    <v-text-field   class="valueInput"
                                                    readonly :label="Internationalization.getLocaleString('buildURLhelperText', globalStore.idiom)"
                                                    :model-value="buildedURL">
                                    </v-text-field>
                                </div>
                            </v-col>
                        </v-row>
<!--  v-if="showDataVisualizer()" -->
                        <v-row class="ma-6" dense no-gutters justify="space-around" align-content="center">
                            <div class="mapPreviewContainer">
                                <l-map ref="previewMap" :use-global-leaflet="false" :zoom="5" :center="[-15.83, -55.86]">
                                    <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="OpenStreetMap"> </l-tile-layer>
                                    <l-geo-json :geojson="visualizedData"></l-geo-json>
                                </l-map>
                            </div>
                        </v-row>
                    </v-container>
                </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="outlined" @click="emit('closeAddInformationLayerDialog')">
                {{ Internationalization.getLocaleString("close", globalStore.idiom) }}
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn variant="outlined" @click="previewResult()">
                {{ Internationalization.getLocaleString('previewResult', globalStore.idiom) }}
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn variant="outlined" @click="registerCurrentRequest()">
                {{ Internationalization.getLocaleString('registerRequest', globalStore.idiom) }}
            </v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>
            </v-card>
            
        </v-dialog>
    </v-row>
</template>
</template>
<style>
.operation-actions {
    justify-content: center;
    border-top: solid #CCC;
}
.row {
    /* border-top: solid thin; */
    /* border-radius: 5px; */
    /* margin: 10px; */
}
.selectionControls {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    vertical-align: middle;
    margin: 10px auto 5px auto;
}
.valueInput {
    margin: 5px 5px 5px 10px;
    width: 70%;
}
.mapPreviewContainer {
    height: 300px;
    width: 100%;
}
</style>