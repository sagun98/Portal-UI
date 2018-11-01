import { NodeBBCategory } from './nodebb-category.interface';

export interface NodeBBCategoriesResponse {
    url: string,
    categories: NodeBBCategory[]
}