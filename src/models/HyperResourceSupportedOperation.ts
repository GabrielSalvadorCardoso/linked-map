import type HyperResourceOperationParameter from "./HyperResourceOperationParameter";

class HyperResourceSupportedOperation {
    public _type: string;
    public _method: string;
    public _appendPath:string;
    public _possibleStatus:number[];
    public _parameters:HyperResourceOperationParameter[];
    
    public get type(): string { return this._type; }
    public set type(value: string) { this._type = value; }

    public get method(): string { return this._method; }
    public set method(value: string) { this._method = value; }

    public get appendPath(): string { return this._appendPath; }
    public set appendPath(value: string) { this._appendPath = value; }

    public get possibleStatus(): number[] { return this._possibleStatus; }
    public set possibleStatus(value: number[]) { this._possibleStatus = value; }

    constructor(type:string, method:string, appendPath:string, possibleStatus:number[], parameters:HyperResourceOperationParameter[]) {
        this._type = type;
        this._method = method;
        this._appendPath = appendPath;
        this._possibleStatus = possibleStatus;
        this._parameters = parameters;
    }
}
export default HyperResourceSupportedOperation;

// {
//     "hydra:returnsHeader": [
//         {
//             "hydra:headerName": "Content-Type",
//             "hydra:possibleValue": [
//                 "application/geo+json",
//                 "image/png"
//             ]
//         }
//     ],
//     "hydra:expectsHeader": [
//         {
//             "hydra:headerName": "Content-Type",
//             "hydra:possibleValue": [
//                 "application/geo+json",
//                 "image/png"
//             ]
//         }
//     ]
// }