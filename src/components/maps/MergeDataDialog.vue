<script>
export default {
    name: "MergeDataDialog",
    props: {
        isMergeDataDialogOpen: Boolean
    },
    data() {
        return {
            isDialogOpen: false
        }
    }, 
    methods: {
        showOnMap() {
            this.$emit('showOnMap')
        }
    },
    watch: {
        'isMergeDataDialogOpen': function() {
            if(this.isMergeDataDialogOpen) {
                this.isDialogOpen = true
            } else {
                this.isDialogOpen = false
            }
        },
        'isMergeDataDialogLoading': function() {
            if(this.isMergeDataDialogLoading) {
                this.isDialogLoading = true
            } else {
                this.isDialogLoading = false
            }
        }
    }
}
</script>
<template>
    <div class="text-center">
        <v-dialog v-model="isDialogOpen" :scrim="false" persistent width="auto">
            <v-card color="primary">
                <v-card-text>
                    We are linkind the data, please wait...
                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
<styles>
</styles>