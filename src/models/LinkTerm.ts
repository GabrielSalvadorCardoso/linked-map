class LinkTerm {
    public _id: string;
    public _source: string;    
    public _term: string;    

    public get id(): string { return this._id; }
    public set id(value: string) { this._id = value; }

    public get source(): string { return this._source; }
    public set source(value: string) { this._source = value; }

    public get term(): string { return this._term; }
    public set term(value: string) { this._term = value; }

    constructor(source:string, term:string, id:string) {        //, type: string
        this._source = source
        this._term = term
        this._id = id
    }

    public getRepresentation():any {
        return {
            "@id": this._id,
            "@type": "@id"
        }
    }

    public getLink():string {
        return `${this._source.trim()}/${this._term}`
    }
}
export default LinkTerm;