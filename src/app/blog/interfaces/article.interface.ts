export interface Article {
    id? : string,
    title? : string,
    author? : string,
    publicationDate? : Date,
    published? : boolean,
    summary? : string,
    content? : string,
    tags? : string[],
    category? : string[],
    // comments? : Comment[]
}