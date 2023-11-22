import HyperResourceUtils from "./HyperResourceUtils";

class HyperResourceSupportedProperty {
    public _type: string;
    public _property: string;
    public _required:boolean;
    public _readable:boolean;
    public _writable:boolean;
    public _isExternal:boolean;
    
    public get type(): string { return this._type; }
    public set type(value: string) { this._type = value; }

    public get property(): string { return this._property; }
    public set property(value: string) { this._property = value; }

    public get required(): boolean { return this._required; }
    public set required(value: boolean) { this._required = value; }

    public get readable(): boolean { return this._readable; }
    public set readable(value: boolean) { this._readable = value; }

    public get writable(): boolean { return this._writable; }
    public set writable(value: boolean) { this._writable = value; }

    public get isExternal(): boolean { return this._isExternal; }
    public set isExternal(value: boolean) { this._isExternal = value; }

    constructor(type:string, property:string, required:boolean, readable:boolean, writable:boolean, isExternal:boolean) {
        this._type = type;
        this._property = property;
        this._required = required;
        this._readable = readable;
        this._writable = writable;
        this._isExternal = isExternal;
    }

    public static build(rawSupportedProperty:any):HyperResourceSupportedProperty {
        return new HyperResourceSupportedProperty(
            rawSupportedProperty[HyperResourceUtils.JSONLD_ATYPE_KEYWORD],
            rawSupportedProperty[HyperResourceUtils.HYDRA_PROPERTY_KEYWORD],
            rawSupportedProperty[HyperResourceUtils.HYDRA_REQUIRED_KEYWORD],
            rawSupportedProperty[HyperResourceUtils.HYDRA_READABLE_KEYWORD],
            rawSupportedProperty[HyperResourceUtils.HYDRA_WRITABLE_KEYWORD],
            rawSupportedProperty[HyperResourceUtils.HYPER_RESOURCE_ISEXTERNAL_KEYWORD]
            
        )
    }
}
export default HyperResourceSupportedProperty;
// {
//     "@type": "hr:SupportedProperty",         type
//     "hydra:property": "canteirodivisorio",   property
//     "hydra:required": false,                 required
//     "hydra:readable": true,                  readable
//     "hydra:writable": true,                  writable
//     "hr:isExternal": false                   isExternal
// }