import { PermissibleEntity } from "./permissible.interface";
import { Publishable } from "./publishable.interface";

export interface Documentation extends PermissibleEntity, Publishable{
    id? : string,
    name? : string,
    description? : string,
    slug? : string,
    version? : number,
    position? : number,
    content? : string,
    tags: string[]
}

export const DefaultDocumentation = <Documentation> {
    id : null,
    name : '',
    description : '',
    slug : '',
    version : null,
    position : null,
    content : '<p></p>',
    tags : []
}