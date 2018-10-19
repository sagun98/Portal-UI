import { CRUD } from './crud.enum';

const permissibleObjects = ['API', 'PRODUCT', 'BLOG'];
let objectPermissions = {};

permissibleObjects.forEach(object => {
    objectPermissions[object] = {};
    Object.keys(CRUD).forEach(crud_operation => {
        objectPermissions[object][crud_operation] = object + '_' + crud_operation
    });
});

export const USER_PERMISSIONS = Object.assign({}, objectPermissions);

export enum ENTITY_PERMISSIONS {
    MODIFY = 'MODIFY', 
    ADMIN = 'ADMIN',
    COLLABORATOR = 'COLLABORATOR'
}



