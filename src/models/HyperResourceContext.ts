import DataDescription from "./DataDescription";
import HyperResourceSupportedProperty from "./HyperResourceSupportedProperty";
import HyperResourceUtils from "./HyperResourceUtils";

class HyperResourceContext extends DataDescription {    
    public static HYPER_RESOURCE_SUPPORTED_PROPERTIES_KEYWORD = `${HyperResourceUtils.HYPER_RESOURCE_PREFIX}:supportedProperties`

    public _supportedProperties: HyperResourceSupportedProperty[];
    public _supportedOperations: any;

    public get supportedProperties(): HyperResourceSupportedProperty[] { return this._supportedProperties; }
    public set supportedProperties(value: HyperResourceSupportedProperty[]) { this._supportedProperties = value; }

    public get supportedPoperations(): any { return this._supportedOperations; }
    public set supportedPoperations(value: any) { this._supportedOperations = value; }

    constructor(source:string, context:any, type: string|string[]|null, supportedProperties:HyperResourceSupportedProperty[], supportedOperations:any) {
        super(source, context, type)
        this._supportedOperations = supportedOperations
        this._supportedProperties = supportedProperties
    }

    public static build(source:string, rawContext:any):HyperResourceContext {
        
        const type = typeof rawContext[HyperResourceUtils.JSONLD_ATYPE_KEYWORD] === 'string'?
                            [rawContext[HyperResourceUtils.JSONLD_ATYPE_KEYWORD]] :
                            rawContext[HyperResourceUtils.JSONLD_ATYPE_KEYWORD]

        return new HyperResourceContext(
            source,
            rawContext[HyperResourceUtils.JSONLD_ACONTEXT_KEYWORD],
            type,
            rawContext[HyperResourceContext.HYPER_RESOURCE_SUPPORTED_PROPERTIES_KEYWORD].map((rawSupProp:any) => HyperResourceSupportedProperty.build(rawSupProp)),
            {}
        )
    }
}
export default HyperResourceContext;