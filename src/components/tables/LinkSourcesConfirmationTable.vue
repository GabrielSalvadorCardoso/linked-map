<script setup lang="ts">
import { ref, watch } from 'vue'
import { type TableItem } from "../LinkSources.vue"
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
// export default {
    // name: "LinkSourcesConfirmationTable",
    // props: {
    //     isLinkSourceDialogOpen: {type: Boolean, required: true},
    //     selectedTableItems: {type: TableItem[], required: true}
    // },
    // setup(props) {
    //     // setup() receives props as the first argument.
    //     // console.log(props)
    // },
    // components: {
        
    // },
//     data() {
//         return {
//             isDialogOpen: false,
//             // contextTableItems: []
//         }
//     }, 
//     methods: {
//         callMe(){
//             alert(`isLinkSourceDialogOpen: ${this.isLinkSourceDialogOpen}`)
//         },
//         closeLinkSourceDialog() {
//             this.$emit('closeLinkSourceDialog')
//         },
//         confirmLinkedSources() {
//             this.$emit('confirmLinkedSources')
//             this.$emit('closeLinkSourceDialog')
//         }
//     },
//     watch: {
//         'isLinkSourceDialogOpen': function() {
//             if(this.isLinkSourceDialogOpen) {
//                 this.isDialogOpen = true
//             } else {
//                 this.isDialogOpen = false
//             }
//         }
//     }
// }
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