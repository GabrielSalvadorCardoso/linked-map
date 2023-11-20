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
    currentLayer: any,
    isNavigationDrawerOpen: boolean,
    isLinksDrawerOpen: boolean,
    navigationDrawerRail: boolean,
    linksDrawerRail: boolean,
    mainContentMarginLeft: string
    mainContentMarginRight: string
}

export const useGlobalStore = defineStore("GlobalStore", {
    state: ():GlobalStoreState => {
        return {
            activeTab: "Main Map",
            sourcesLinks: {},
            currentLayer: null,
            isNavigationDrawerOpen: false,
            navigationDrawerRail: true,
            isLinksDrawerOpen: false,
            linksDrawerRail: true,
            mainContentMarginLeft: '56px',//mainContentMarginLeft: 256,
            mainContentMarginRight: '56px'//mainContentMarginRight: 256,
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
        },
        toggleNavigationDrawer() {
            this.isNavigationDrawerOpen = !this.isNavigationDrawerOpen;
            console.log(this.isNavigationDrawerOpen)
        },
        setNavigationDrawerState(state:boolean) {
            this.navigationDrawerRail = state
            if(this.navigationDrawerRail) {
                this.mainContentMarginLeft = '56px'
            } else {
                this.mainContentMarginLeft = '256px'
            }
        },
        setLinksDrawerRail(state:boolean) {
            this.linksDrawerRail = state
            if(this.linksDrawerRail) {
                this.mainContentMarginRight = '56px'
            } else {
                this.mainContentMarginRight = '256px'
            }
            // console.log(this.linksDrawerRail)
        }
    }
})