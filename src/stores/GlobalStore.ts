import { defineStore } from "pinia";

const SOURCES_LINK = {
    "http://127.0.0.1:8001/taxas-rendimento-escolar-por-municipio-list/filter/codigo_municipio/eq/3304557 + http://bcim.geoapi/lim-municipio-a-list/filter/geocodigo/eq/3304557": [
        {
            source: "http://bcim.geoapi/lim-municipio-a-list/filter/geocodigo/eq/3304557",
            term: "geocodigo",
            semantic: "schema:identifier",
            type: "schema:StructuredValue"
        },
        {
            source: "http://127.0.0.1:8001/taxas-rendimento-escolar-por-municipio-list/filter/codigo_municipio/eq/3304557",
            term: "codigo_municipio",
            semantic: "schema:identifier",
            type: "schema:StructuredValue"
        }
    
    ]
}

export interface LinkinMap {
    [key:string]: LinkinItem[]
}

export interface LinkinItem {    
    type: string|null|undefined,
    term: string,
    semantic: string,
    source: string
}

export interface NavigationEntryPoints {
    [key:string]: Object
}

export interface GlobalStoreState {
    activeTab: string,
    sourcesLinks: LinkinMap,
    currentLayer: any,
    isNavigationDrawerOpen: boolean,
    isLinksDrawerOpen: boolean,
    navigationDrawerRail: boolean,
    linksDrawerRail: boolean,
    mainContentMarginLeft: string,
    mainContentMarginRight: string,
    navigationEntryPointsLoaded: NavigationEntryPoints
}

export const useGlobalStore = defineStore("GlobalStore", {
    state: ():GlobalStoreState => {
        return {
            activeTab: "API Navigation",//"Main Map",
            sourcesLinks: SOURCES_LINK,
            currentLayer: null,
            isNavigationDrawerOpen: false,
            navigationDrawerRail: true,
            isLinksDrawerOpen: false,
            linksDrawerRail: true,
            mainContentMarginLeft: '56px',//mainContentMarginLeft: 256,
            mainContentMarginRight: '56px',//mainContentMarginRight: 256,
            navigationEntryPointsLoaded: {}
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
        },

        addNavigationEntryPoint(navigationEntryPoint: NavigationEntryPoints) {
            
            this.navigationEntryPointsLoaded = {...this.navigationEntryPointsLoaded, ...navigationEntryPoint}
            // console.log(this.navigationEntryPointsLoaded)
        }
    }
})