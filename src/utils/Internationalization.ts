type LocalizationDict = {
    // information layer dialog
    addInformationLayerDialogTitle: string,
    supportedOperationsTableTitle: string,
    previewResult: string,
    registerRequest: string,
    buildURLhelperText: string,
    supportedOperationsTableMethod: string,
    supportedOperationsTableAppendPath: string,
    supportedOperationsTablePossibleStatus: string,
    propertyLabel: string,
    operatorLabel: string,
    insertValueLabel: string,

    // API explorer
    apiExplorerEntryPointURLsLabel: string,

    // Link Sources
    linkSourceRegisterNewURL: string, 
    linkSourceRegisteredURLs: string,
    linkResourcesLabel: string,

    // main map
    addInformationLayer: string,
    selectIdiom: string,

    // others
    close: string,
    add: string
    semantic: string,
    term: string,
    source: string,
    type: string,
    linkBy: string
}

type Localization = {
    us: LocalizationDict,
    pt: LocalizationDict
}

class Internationalization {
    private static instance:Internationalization|null = null;
    private static labels:Localization = {
        us: {
            addInformationLayerDialogTitle: "Insert and explore a URLs",
            supportedOperationsTableTitle: "Supported Operations",
            previewResult: "Preview result",
            registerRequest: "Register request",
            buildURLhelperText: "Build URL by selecting options above",
            supportedOperationsTableMethod: "Method",
            supportedOperationsTableAppendPath: "Append path",
            supportedOperationsTablePossibleStatus: "Possible status",
            propertyLabel: "Property",
            operatorLabel: "Operator",
            insertValueLabel: "Insert a value (compatible with the selected property)",
            
            apiExplorerEntryPointURLsLabel: "Insert a Entry Point URL",

            linkSourceRegisterNewURL: "Register new URL",
            linkSourceRegisteredURLs: "Registered URLs",
            linkResourcesLabel: "Link Resources",

            addInformationLayer: "Add Information Layer",
            
            selectIdiom: "Select idiom",
            close: "Close",
            add: "Add",
            semantic: "Semantic",
            term: "Term",
            source: "Source",
            type: "Type",
            linkBy: "Link by"
        },
        pt: {
            addInformationLayerDialogTitle: "Informe e explore as URLs",
            supportedOperationsTableTitle: "Operações Suportadas",
            previewResult: "Visualizar resultado",
            registerRequest: "Registrar requisição",
            buildURLhelperText: "Construa a URL selecionando as opções acima",
            supportedOperationsTableMethod: "Método",
            supportedOperationsTableAppendPath: "Modelo da URL",
            supportedOperationsTablePossibleStatus: "Status possíveis",
            propertyLabel: "Propriedade",
            operatorLabel: "Operador",
            insertValueLabel: "Informe um valor (compatível com a propriedade selecionada)",

            apiExplorerEntryPointURLsLabel: "Insira uma URL de página de entrada",

            linkSourceRegisterNewURL: "Registrar novo URL",
            linkSourceRegisteredURLs: "Registered URLs registradas",
            linkResourcesLabel: "Ligar Recursos",

            addInformationLayer: "Adicionar camada de informação",
            selectIdiom: "Selecionar idioma",
            close: "Fechar",
            add: "Adicionar",
            semantic: "Semantica",
            term: "Termo",
            source: "Fonte",
            type: "Tipo",
            linkBy: "Ligar por"
        }
    }

    public static getLocaleString(term:string, idiom:string):string {
        // @ts-ignore
        return Internationalization.labels[idiom][term]
    }

    public static getInstance():Internationalization {
        if(!this.instance) {
            this.instance = new Internationalization()
        }
        return this.instance
    }
}
export default Internationalization;