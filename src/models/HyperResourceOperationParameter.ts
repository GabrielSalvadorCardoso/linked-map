class HyperResourceOperationParameter {
    public _type: string;
    public _variable: string;
    public _requiredParameter:boolean;
    public _expects:string;
    public _expectsSerialization:string[];
    
    public get type(): string { return this._type; }
    public set type(value: string) { this._type = value; }

    public get variable(): string { return this._variable; }
    public set variable(value: string) { this._variable = value; }

    public get requiredParameter(): boolean { return this._requiredParameter; }
    public set requiredParameter(value: boolean) { this._requiredParameter = value; }

    public get expects(): string { return this._expects; }
    public set expects(value: string) { this._expects = value; }

    public get expectsSerialization(): string[] { return this._expectsSerialization; }
    public set expectsSerialization(value: string[]) { this._expectsSerialization = value; }

    constructor(type:string, variable:string, requiredParameter:boolean, expects:string, expectsSerialization:string[]) {
        this._type = type;
        this._variable = variable;
        this._requiredParameter = requiredParameter;
        this._expects = expects;
        this._expectsSerialization = expectsSerialization;
        
    }
}
export default HyperResourceOperationParameter;

// {
//     "@type": "hr:OperationParameter",
//     "hr:variable": "param0",
//     "hr:requiredParameter": true,
//     "hydra:expects": "geojson:Geometry",
//     "hr:expectsSerialization": [
//         "text/plain",
//         "application/geo+json"
//     ]
// }