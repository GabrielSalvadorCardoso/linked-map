<script>
export default {
    name: "LinkSourcesConfirmationTable",
    props: {
        isLinkSourceDialogOpen: Boolean,
        contextTableItems: Object
    },
    setup(props) {
        // setup() receives props as the first argument.
        // console.log(props)
    },
    components: {
        
    },
    data() {
        return {
            isDialogOpen: false,
            // contextTableItems: []
        }
    }, 
    methods: {
        callMe(){
            alert(`isLinkSourceDialogOpen: ${this.isLinkSourceDialogOpen}`)
        },
        closeLinkSourceDialog() {
            this.$emit('closeLinkSourceDialog')
        }
    },
    watch: {
        'isLinkSourceDialogOpen': function() {
            if(this.isLinkSourceDialogOpen) {
                this.isDialogOpen = true
            } else {
                this.isDialogOpen = false
            }
        }
    }
}
</script>
<template>
    
    <!-- <pre>{{ isLinkSourceDialogOpen }}</pre>
    <pre>{{ contextTableItems }}</pre> -->
    <v-col cols="auto">
        
        <v-dialog transition="dialog-bottom-transition" v-model="isDialogOpen" width="auto">
            <v-card>
                <v-toolbar color="primary" :title="`Link sources confirmation`"></v-toolbar>
                <v-card-text>
                    <pre>{{ contextTableItems }}</pre>
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-btn variant="text" @click="closeLinkSourceDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-col>
</template>
<styles>
</styles>