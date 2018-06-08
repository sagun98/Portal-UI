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

  public getProducts() {
    return this.http.get('http://localhost:8080/products');
  }

  public addProduct( product : Product ) {
    return this.http.post(`http://localhost:8080/products`, product);
  }

  public updateProduct ( product : Product ) {
    return this.http.put(`http://localhost:8080/products/${product.id}`, product);
  }

  public getProduct ( productId : string ) {
    return this.http.get(`http://localhost:8080/products/${productId}`);
  }
}
