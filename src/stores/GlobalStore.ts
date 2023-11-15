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
    sourcesLinks: LinkinMap,
    currentLayer: any
}

export const useGlobalStore = defineStore("GlobalStore", {
    state: ():GlobalStoreState => {
        return {
            activeTab: "Main Map",
            sourcesLinks: {},
            currentLayer: null
        }
    },
    actions: {
        async setActiveTab(tabName:string) {
            this.activeTab = tabName
        },
        addSourcesLink(sourcesLink:LinkinMap) {
            this.sourcesLinks = {...this.sourcesLinks, ...sourcesLink}
        },
        setCurrentLayer(layer:any) {
            this.currentLayer = layer
        }
    }
})