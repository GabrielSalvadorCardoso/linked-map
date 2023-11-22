class HyperResourceUtils {
    public static JSONLD_ACONTEXT_KEYWORD = "@context";
    public static JSONLD_AID_KEYWORD = "@id";
    public static JSONLD_ATYPE_KEYWORD = "@type";

    public static HYDRA_PREFIX = "hydra";
    public static HYPER_RESOURCE_PREFIX = "hr"

    public static HYDRA_PROPERTY_KEYWORD = `${HyperResourceUtils.HYDRA_PREFIX}:property`
    public static HYDRA_REQUIRED_KEYWORD = `${HyperResourceUtils.HYDRA_PREFIX}:required`
    public static HYDRA_READABLE_KEYWORD = `${HyperResourceUtils.HYDRA_PREFIX}:readable`
    public static HYDRA_WRITABLE_KEYWORD = `${HyperResourceUtils.HYDRA_PREFIX}:writable`
    public static HYPER_RESOURCE_ISEXTERNAL_KEYWORD = `${HyperResourceUtils.HYPER_RESOURCE_PREFIX}:isExternal`
}
export default HyperResourceUtils;