import { CRUD } from "../../../core/enums/crud.enum";
import { Product } from "./product.interface";

export interface ProductListChange {
    action : CRUD,
    product : Product
  }