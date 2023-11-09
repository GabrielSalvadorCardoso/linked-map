import { defineStore } from "pinia";
export const useGlobalStore = defineStore("GlobalStore", {
    state: () => {
        return {
            activeTab: "Home"
        }
    },
    actions: {
        async setActiveTab(tabName) {
            this.activeTab = tabName
        }
    }
})