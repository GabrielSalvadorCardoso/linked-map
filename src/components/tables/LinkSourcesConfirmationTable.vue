<script setup lang="ts">
import { ref, watch } from 'vue'
import { type TableItem } from "../workspace/LinkSources.vue"
interface LinkSourcesConfirmationTableProps {
    isLinkSourceDialogOpen: boolean,
    selectedTableItems: TableItem[]
}

const props = defineProps<LinkSourcesConfirmationTableProps>()
const isDialogOpen = ref(props.isLinkSourceDialogOpen)

const emit = defineEmits(['confirmLinkedSources', 'closeLinkSourceDialog'])
watch(
  () => props.isLinkSourceDialogOpen,
  () => {
    isDialogOpen.value = props.isLinkSourceDialogOpen
  }
)
</script>
<template>
    <v-col cols="auto">
        
        <v-dialog transition="dialog-bottom-transition" v-model="isDialogOpen" width="auto">
            <v-card>
                <v-toolbar color="primary" :title="`Link sources confirmation`"></v-toolbar>
                <v-card-text>
                    <pre>{{ selectedTableItems }}</pre>
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-btn variant="text" @click="($event:any) => emit('confirmLinkedSources')">Confirm</v-btn>
                    
                    <v-btn variant="text" @click="($event:any) => emit('closeLinkSourceDialog')">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-col>
</template>
<styles>
</styles>