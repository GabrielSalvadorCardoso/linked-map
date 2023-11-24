import type HyperResourceContext from "@/models/HyperResourceContext";
import type LinkTerm from "@/models/LinkTerm";
import { defineStore } from "pinia";
const NAV_DRAWER_OPEN_WIDTH = '256px'
const NAV_DRAWER_CLOSE_WIDTH = '56px'
// const SOURCES_LINK = {
//     "http://127.0.0.1:8001/taxas-rendimento-escolar-por-municipio-list/filter/codigo_municipio/eq/3304557 + http://bcim.geoapi/lim-municipio-a-list/filter/geocodigo/eq/3304557": [
//         {
//             source: "http://bcim.geoapi/lim-municipio-a-list/filter/geocodigo/eq/3304557",
//             term: "geocodigo",
//             semantic: "schema:identifier",
//             type: "schema:StructuredValue"
//         },
//         {
//             source: "http://127.0.0.1:8001/taxas-rendimento-escolar-por-municipio-list/filter/codigo_municipio/eq/3304557",
//             term: "codigo_municipio",
//             semantic: "schema:identifier",
//             type: "schema:StructuredValue"
//         }
    
//     ]
// }

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
    [key:string]: LinkTerm[]
}

export interface NavigationEndPoints {
    [key:string]: HyperResourceContext
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
    navigationEntryPointsLoaded: NavigationEntryPoints,
    navigationEndPointsLoaded: NavigationEndPoints,
    registeredLinks: string[]
}

export const useGlobalStore = defineStore("GlobalStore", {
    state: ():GlobalStoreState => {
        return {
            activeTab: "API Navigation",//"Main Map",
            sourcesLinks: {},
            currentLayer: null,
            isNavigationDrawerOpen: false,
            navigationDrawerRail: true,
            isLinksDrawerOpen: false,
            linksDrawerRail: true,
            mainContentMarginLeft: '56px',//mainContentMarginLeft: 256,
            mainContentMarginRight: '56px',//mainContentMarginRight: 256,
            navigationEntryPointsLoaded: {},
            navigationEndPointsLoaded: {},
            registeredLinks: []
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
            // console.log(this.isNavigationDrawerOpen)
        },
        setNavigationDrawerState(state:boolean) {
            this.navigationDrawerRail = state
            if(this.navigationDrawerRail) {
                this.mainContentMarginLeft = NAV_DRAWER_CLOSE_WIDTH
            } else {
                this.mainContentMarginLeft = NAV_DRAWER_OPEN_WIDTH
            }
        },
        setLinksDrawerRail(state:boolean) {
            this.linksDrawerRail = state
            if(this.linksDrawerRail) {
                this.mainContentMarginRight = NAV_DRAWER_CLOSE_WIDTH
            } else {
                this.mainContentMarginRight = NAV_DRAWER_OPEN_WIDTH
            }
        },

        addNavigationEntryPoint(navigationEntryPoint: NavigationEntryPoints) {
            this.navigationEntryPointsLoaded = {...this.navigationEntryPointsLoaded, ...navigationEntryPoint}
        },
        addNavigationEndPoint(navigationEndPointsLoaded: NavigationEndPoints) {
            this.navigationEndPointsLoaded = {...this.navigationEndPointsLoaded, ...navigationEndPointsLoaded}
        },

        registerLink(link:string) {
            if(!this.registeredLinks.includes(link)) {
                this.registeredLinks.push(link)
            }
        }
    }
})