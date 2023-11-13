class DataDescription {
    public _source: string;
    public _context: any;
    public _type: string|string[]|null;

    public get source(): string { return this._source; }
    public set source(value: string) { this._source = value; }

    public get context(): any { return this._context; }
    public set context(value: any) { this._context = value; }

    public get type(): string|string[]|null { return this._type; }
    public set type(value: string|string[]|null) { this._type = value; }

    constructor(source:string, context:any, type: string|string[]|null) {
        this._source = source
        this._context = context
        this._type = type
    }

    public getRepresentation():any {
        return {
            "@context": this._context,
            "@type": this._type
        }
    }
}
export default DataDescription;