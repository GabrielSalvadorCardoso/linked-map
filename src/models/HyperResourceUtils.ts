class HyperResourceUtils {
    public static JSONLD_ACONTEXT_KEYWORD = "@context";
    public static JSONLD_AID_KEYWORD = "@id";
    public static JSONLD_ATYPE_KEYWORD = "@type";

    public static HYDRA_PREFIX = "hydra";
    public static HYPER_RESOURCE_PREFIX = "hr"

    public static HYPER_RESOURCE_SUPPORTED_PROPERTIES_KEYWORD = `${HyperResourceUtils.HYPER_RESOURCE_PREFIX}:supportedProperties`
    public static HYPER_RESOURCE_SUPPORTED_OPERATIONS_KEYWORD = `${HyperResourceUtils.HYPER_RESOURCE_PREFIX}:supportedOperations`

    public static HYPER_RESOURCE_VARIABLE_KEYWORD = `${HyperResourceUtils.HYPER_RESOURCE_PREFIX}:variable`
    public static HYPER_RESOURCE_REQUIRED_PARAMETER_KEYWORD = `${HyperResourceUtils.HYPER_RESOURCE_PREFIX}:requiredParameter`
    public static HYPER_RESOURCE_EXPECTS_SERIALIZATION_KEYWORD = `${HyperResourceUtils.HYPER_RESOURCE_PREFIX}:expectsSerialization`
    public static HYPER_RESOURCE_PARAMETERS_KEYWORD = `${HyperResourceUtils.HYPER_RESOURCE_PREFIX}:parameters`

    public static HYPER_RESOURCE_OPERATION_KEYWORD = `${HyperResourceUtils.HYPER_RESOURCE_PREFIX}:Operation`
    public static HYPER_RESOURCE_SUPPORTED_PROPERTY_KEYWORD = `${HyperResourceUtils.HYPER_RESOURCE_PREFIX}:SupportedProperty`
    public static HYPER_RESOURCE_APPEND_PATH_KEYWORD = `${HyperResourceUtils.HYPER_RESOURCE_PREFIX}:appendPath`    

    public static HYDRA_PROPERTY_KEYWORD = `${HyperResourceUtils.HYDRA_PREFIX}:property`
    public static HYDRA_REQUIRED_KEYWORD = `${HyperResourceUtils.HYDRA_PREFIX}:required`
    public static HYDRA_READABLE_KEYWORD = `${HyperResourceUtils.HYDRA_PREFIX}:readable`
    public static HYDRA_WRITABLE_KEYWORD = `${HyperResourceUtils.HYDRA_PREFIX}:writable`
    public static HYDRA_EXPECTS_KEYWORD = `${HyperResourceUtils.HYDRA_PREFIX}:expects`
    
    public static HYPER_RESOURCE_ISEXTERNAL_KEYWORD = `${HyperResourceUtils.HYPER_RESOURCE_PREFIX}:isExternal`
    public static HYDRA_RETURNS_HEADER_KEYWORD = `${HyperResourceUtils.HYDRA_PREFIX}:returnsHeader`
    public static HYDRA_POSSIBLE_STATUS_HEADER_KEYWORD = `${HyperResourceUtils.HYDRA_PREFIX}:possibleStatus`

    public static HYDRA_METHOD_KEYWORD = `${HyperResourceUtils.HYDRA_PREFIX}:method`
    
}
export default HyperResourceUtils;

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
            ]
        }
*/