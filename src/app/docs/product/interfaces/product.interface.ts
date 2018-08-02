import { PermissibleEntity } from './../../../core/interfaces/permissible.interface';

export interface Product extends PermissibleEntity{
    id ? : string,
    version? : number,
    name : string,
    slug : string,
    description : string,
    overview? : string,
    apis : string[]
}