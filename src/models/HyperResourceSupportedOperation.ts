import HyperResourceOperationParameter from "./HyperResourceOperationParameter";
import HyperResourceUtils from "./HyperResourceUtils";

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

    public static build(rawSupOp:any):HyperResourceSupportedOperation {

        return new HyperResourceSupportedOperation(
            rawSupOp[HyperResourceUtils.JSONLD_ATYPE_KEYWORD],
            rawSupOp[HyperResourceUtils.HYDRA_METHOD_KEYWORD],
            rawSupOp[HyperResourceUtils.HYPER_RESOURCE_APPEND_PATH_KEYWORD],
            rawSupOp[HyperResourceUtils.HYDRA_POSSIBLE_STATUS_HEADER_KEYWORD],            
            rawSupOp[HyperResourceUtils.HYPER_RESOURCE_PARAMETERS_KEYWORD].map((rawOpParams:any) => HyperResourceOperationParameter.build(rawOpParams))
        )
    }
}
export default HyperResourceSupportedOperation;

/*
    "hr:supportedOperations": [
        {
            "@type": "hr:Operation",
            "hydra:method": "GET",
            "hr:appendPath": "/within/{param0}",
            "hr:parameters": [
                {
                    "@type": "hr:OperationParameter",
                    "hr:variable": "param0",
                    "hr:requiredParameter": true,
                    "hydra:expects": "geojson:Geometry",
                    "hr:expectsSerialization": [
                        "text/plain",
                        "application/geo+json"
                    ]
                }
            ],
            "hydra:returnsHeader": [
                {
                    "hydra:headerName": "Content-Type",
                    "hydra:possibleValue": [
                        "application/geo+json",
                        "image/png"
                    ]
                }
            ],
            "hydra:expectsHeader": [
                {
                    "hydra:headerName": "Content-Type",
                    "hydra:possibleValue": [
                        "application/geo+json",
                        "image/png"
                    ]
                }
            ],
            "hydra:possibleStatus": [
                200
            ]
        },
        {
            "@type": "hr:Operation",
            "hydra:method": "GET",
            "hr:appendPath": "/contains/{param0}",
            "hr:parameters": [
                {
                    "@type": "hr:OperationParameter",
                    "hr:variable": "param0",
                    "hr:requiredParameter": true,
                    "hydra:expects": "geojson:Geometry",
                    "hr:expectsSerialization": [
                        "text/plain",
                        "application/geo+json"
                    ]
                }
            ],
            "hydra:returnsHeader": [
                {
                    "hydra:headerName": "Content-Type",
                    "hydra:possibleValue": [
                        "application/geo+json",
                        "image/png"
                    ]
                }
            ],
            "hydra:expectsHeader": [
                {
                    "hydra:headerName": "Content-Type",
                    "hydra:possibleValue": [
                        "application/geo+json",
                        "image/png"
                    ]
                }
            ],
            "hydra:possibleStatus": [
                200
            ]
        },
        {
            "@type": "hr:Operation",
            "hydra:method": "GET",
            "hr:appendPath": "/contained/{param0}",
            "hr:parameters": [
                {
                    "@type": "hr:OperationParameter",
                    "hr:variable": "param0",
                    "hr:requiredParameter": true,
                    "hydra:expects": "geojson:Geometry",
                    "hr:expectsSerialization": [
                        "text/plain",
                        "application/geo+json"
                    ]
                }
            ],
            "hydra:returnsHeader": [
                {
                    "hydra:headerName": "Content-Type",
                    "hydra:possibleValue": [
                        "application/geo+json",
                        "image/png"
                    ]
                }
            ],
            "hydra:expectsHeader": [
                {
                    "hydra:headerName": "Content-Type",
                    "hydra:possibleValue": [
                        "application/geo+json",
                        "image/png"
                    ]
                }
            ],
            "hydra:possibleStatus": [
                200
            ]
        }
    ],
*/