<script setup lang="ts">
import { ref } from 'vue'
import { type DataDescriptionMap, type TableItem } from '../workspace/LinkSources.vue'
import LinkSourcesConfirmationTable from './LinkSourcesConfirmationTable.vue'
import type { LinkinItem, LinkinMap } from '@/stores/GlobalStore';
import { useGlobalStore } from "@/stores/GlobalStore";
const globalStore = useGlobalStore()
const props = defineProps<{
    contexts: DataDescriptionMap,
    contextTableItems: TableItem[]
}>()
const contexts = props.contexts

const emits = defineEmits(['confirmLinkedSources', 'confirmLinkedSources'])

const isLinkSourceDialogOpen = ref(false)
const selectedTableItems = ref<TableItem[]>([])

const isFirstInDuplicationSemanticSet = (item:TableItem, itemIndex:number):boolean => {
    if(isUniqueSemanticItem(item)) {
        return false
    } else {
        return itemIndex < Math.min(...item.matchsWith)
    }
}
const isUniqueSemanticItem = (item:TableItem):boolean => {
    if(item.matchsWith.length === 0) {
        return true
    } else {
        let matchItems = props.contextTableItems.filter((_item:TableItem, index: number) => item.matchsWith.includes(index))
        return itemsFromSameSource(item, matchItems)
    }
}
const itemsFromSameSource = (firstItem:TableItem, items:TableItem[]):boolean => {
    let source = firstItem.source
    let diffSourceItem = items.find((_item) => _item.source !== source)
    return diffSourceItem === undefined
}
const confirmLinkedSources = () => {
    let sourcesLinks:LinkinMap = {}
    
    for(let i=0; i<selectedTableItems.value.length; i++) {
        let item = selectedTableItems.value[i]
        let matchItems = props.contextTableItems.filter((_item:TableItem, index: number) => item.matchsWith.includes(index))
        matchItems.push(item)
        let nameOfTheSet = matchItems.map(_item => _item.source).join(" + ")
        let _matchItems:LinkinItem[] = matchItems.map(_item => {
            return {
                semantic: _item.semantic,
                term: _item.term,
                type: _item.type,
                source: _item.source
            }
            
        })
        sourcesLinks[nameOfTheSet] = _matchItems;
    }
    isLinkSourceDialogOpen.value = false
    globalStore.addSourcesLink(sourcesLinks)
}
const openLinkSourceDialog = () => {
    isLinkSourceDialogOpen.value = true
}
const closeLinkSourceDialog = () => {
    isLinkSourceDialogOpen.value = false
}
const setLinkSourcesSelection = (event:any, item:TableItem) => {
    if(event.target.checked) {
        selectedTableItems.value.push(item)
    } else {
        selectedTableItems.value = selectedTableItems.value.filter((_item:TableItem) => {
            return (
                _item.semantic !== item.semantic || _item.source !== item.source ||
                _item.term !== item.term || _item.type !== item.type
            )
        })
    }
}
</script>
<template>
    <div class="container">
        <v-table v-if="Object.keys(contexts).length > 1" class="link-sources-table" density="compact">
            <thead>
                <tr>
                    <th class="text-left"> </th>                    
                    <th class="text-left">Semantic (@id)</th>                    
                    <th class="text-left">Term</th>
                    <th class="text-left">Source</th>
                    <th class="text-left">Type (@type)</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in contextTableItems" :key="`${item.semantic}-${item.source}`">
                    <td v-if="isUniqueSemanticItem(item)">
                        <input type="checkbox" disabled/>
                    </td>
                    <td v-if="isFirstInDuplicationSemanticSet(item, index)" :rowspan="item.matchsWith.length+1">
                        <input type="checkbox" v-on:click="($event) => setLinkSourcesSelection($event, item)" />
                    </td>

                    <td v-if="isUniqueSemanticItem(item)">{{ item.semantic }}</td>
                    <td v-if="isFirstInDuplicationSemanticSet(item, index)" :rowspan="item.matchsWith.length+1">{{ item.semantic }}</td>

                    <td>{{ item.term }}</td>
                    <td>{{ item.source }}</td>
                    <td>{{ item.type }}</td>
                </tr>
            </tbody>
            <LinkSourcesConfirmationTable   :isLinkSourceDialogOpen="isLinkSourceDialogOpen"
                                            v-on:closeLinkSourceDialog="closeLinkSourceDialog"
                                            v-on:confirmLinkedSources="confirmLinkedSources"
                                            :selectedTableItems="selectedTableItems"
                                            :contextTableItems="contextTableItems" />
        </v-table>
        <v-btn class="link-sources-btn" v-if="Object.keys(contexts).length > 1" v-on:click="($event:any) => openLinkSourceDialog()" variant="outlined">
            Link Sources
        </v-btn>
    </div>
</template>
<style>
/* .container {
    margin: 10px 255px;
    display: flex;
    flex-direction: column;
    justify-content: center;
} */
</style>