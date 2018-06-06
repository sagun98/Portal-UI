import { Product } from './product.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  public addProduct( product : Product ) {
    return this.http.post(`http://localhost:3000/api/v1/product?apikey=12345`, product);
  }

  public updateProduct ( product : Product ) {
    return this.http.put(`http://localhost:3000/api/v1/product/${product.id}?apikey=12345`, product);
  }

  public getProduct ( productId : string ) {
    return this.http.get(`http://localhost:3000/api/v1/product/${productId}?apikey=12345`);
  }
}
