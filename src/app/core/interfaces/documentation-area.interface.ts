import { Documentation } from "./documentation.interface";

export interface DocumentationArea {
    id? : string,
    name? : string
    slug? : string,
    description? : string,
    version? : number,
    position? : number
    documents? : Documentation[]
}

export const DefaultDocumentationArea = <DocumentationArea> {
    id : null,
    name : '',
    slug : '',
    description : '',
    version : null,
    documents : []
}