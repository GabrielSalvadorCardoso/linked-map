<script lang="ts">
type FeatureInfoDialogProps = {
    isFeatureInfoDialogOpen: boolean
}
  export default {
    props: {
        isFeatureInfoDialogOpen: Boolean
    },
    data () {
        return {
            isDialogOpen: false,
            // notifications: false,
            // sound: true,
            // widgets: false,
        }
    },
    watch: {
        'isFeatureInfoDialogOpen': function() {
            if(this.isFeatureInfoDialogOpen) {
                this.isDialogOpen = true
            } else {
                this.isDialogOpen = false
            }
        }
    },
  }
</script>
<template>
    <v-row justify="center">
        <v-dialog   v-model="isDialogOpen"
                    fullscreen
                    :scrim="false"
                    transition="dialog-bottom-transition"
        >
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="isDialogOpen = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Settings</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    <!-- <v-btn variant="text" @click="dialog = false">Save</v-btn> -->
                    </v-toolbar-items>
                </v-toolbar>
                <v-list lines="two" subheader>
                    <v-list-subheader>User Controls</v-list-subheader>
                    <v-list-item title="Content filtering" subtitle="Set the content filtering level to restrict apps that can be downloaded"></v-list-item>
                    <v-list-item title="Password" subtitle="Require password for purchase or use password to restrict purchase"></v-list-item>
                </v-list>
                <v-divider></v-divider>
                <!-- <v-list lines="two" subheader>
                    <v-list-subheader>General</v-list-subheader>
                    <v-list-item title="Notifications" subtitle="Notify me about updates to apps or games that I downloaded">
                        <template v-slot:prepend>
                            <v-checkbox v-model="notifications"></v-checkbox>
                        </template>
                    </v-list-item>
                    <v-list-item title="Sound" subtitle="Auto-update apps at any time. Data charges may apply">
                        <template v-slot:prepend>
                            <v-checkbox v-model="sound"></v-checkbox>
                        </template>
                    </v-list-item>
                    <v-list-item title="Auto-add widgets" subtitle="Automatically add home screen widgets">
                    <template v-slot:prepend>
                        <v-checkbox v-model="widgets"></v-checkbox>
                    </template>
                    </v-list-item>
                </v-list> -->
            </v-card>
        </v-dialog>
    </v-row>
</template>
<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
    transition: transform .2s ease-in-out;
}
</style>