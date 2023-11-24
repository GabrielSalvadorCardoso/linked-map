import DataDescription from "./DataDescription";
import HyperResourceSupportedOperation from "./HyperResourceSupportedOperation";
import HyperResourceSupportedProperty from "./HyperResourceSupportedProperty";
import HyperResourceUtils from "./HyperResourceUtils";

class HyperResourceContext extends DataDescription {
    public _supportedProperties: HyperResourceSupportedProperty[];
    public _supportedOperations: HyperResourceSupportedOperation[];

    public get supportedProperties(): HyperResourceSupportedProperty[] { return this._supportedProperties; }
    public set supportedProperties(value: HyperResourceSupportedProperty[]) { this._supportedProperties = value; }

    public get supportedPoperations(): HyperResourceSupportedOperation[] { return this._supportedOperations; }
    public set supportedPoperations(value: HyperResourceSupportedOperation[]) { this._supportedOperations = value; }

    constructor(source:string, context:any, type: string|string[]|null, supportedProperties:HyperResourceSupportedProperty[], supportedOperations:HyperResourceSupportedOperation[]) {
        super(source, context, type)
        this._supportedOperations = supportedOperations
        this._supportedProperties = supportedProperties
    }

    public static build(source:string, rawContext:any):HyperResourceContext {
        
        const type = typeof rawContext[HyperResourceUtils.JSONLD_ATYPE_KEYWORD] === 'string'?
                            [rawContext[HyperResourceUtils.JSONLD_ATYPE_KEYWORD]] :
                            rawContext[HyperResourceUtils.JSONLD_ATYPE_KEYWORD]
        const rawSupProps = rawContext[HyperResourceUtils.HYPER_RESOURCE_SUPPORTED_PROPERTIES_KEYWORD]
        const rawSupOps = rawContext[HyperResourceUtils.HYPER_RESOURCE_SUPPORTED_OPERATIONS_KEYWORD]
        return new HyperResourceContext(
            source,
            rawContext[HyperResourceUtils.JSONLD_ACONTEXT_KEYWORD],
            type,
            rawSupProps?rawSupProps.map((rawSupProp:any) => HyperResourceSupportedProperty.build(rawSupProp)):[],
            rawSupOps?rawSupOps.map((rawSupOp:any) => HyperResourceSupportedOperation.build(rawSupOp)):[]
        )
    }
}
export default HyperResourceContext;