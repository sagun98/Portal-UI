export interface BlogPost {
    id? : string,
    title? : string,
    author? : string,
    image? : File,
    allowComments? : boolean,
    publicationDate? : any,
    published? : boolean,
    summary? : string,
    content? : string,
    tags? : string[],
    category? : string,
    subCategory? : string,
    comments? : Comment[]
}