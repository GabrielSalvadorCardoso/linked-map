import { defineStore } from "pinia";

export interface LinkinMap {
    [key:string]: LinkinItem[]
}

export interface LinkinItem {    
    type: string|null|undefined,
    term: string,
    semantic: string,
    source: string
}

export interface GlobalStoreState {
    activeTab: string,
    sourcesLinks: LinkinMap
}

export const useGlobalStore = defineStore("GlobalStore", {
    state: ():GlobalStoreState => {
        return {
            activeTab: "Main Map",
            sourcesLinks: {}
        }
    },
    actions: {
        async setActiveTab(tabName:string) {
            this.activeTab = tabName
        },
        addSourcesLink(sourcesLink:LinkinMap) {
            this.sourcesLinks = {...this.sourcesLinks, ...sourcesLink}
        }
    }
})