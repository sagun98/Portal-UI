import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export enum SEARCH_TYPES {
  API = 'apis',
  BLOG = 'blogs',
  PRODUCT = 'prodcuts'
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor( private http: HttpClient ) { }

  public search (phrase : string, type? : SEARCH_TYPES) {
    let searchType: string = (type) ? `/${type}` : '';
    return this.http.post(`${environment.restBase}/search${searchType}`, { phrase }); 
  }
}
