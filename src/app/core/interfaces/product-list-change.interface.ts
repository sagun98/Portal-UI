import { Product } from "./product.interface";
import { CRUD } from "../enums/crud.enum";

export interface ProductListChange {
    action : CRUD,
    product : Product
  }