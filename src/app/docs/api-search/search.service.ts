import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
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

  constructor( 
    private http: HttpClient,
    private toastrService: ToastrService
  ) { }

  public search (phrase : string, type? : SEARCH_TYPES) {
    let searchType: string = (type) ? `/${type}` : '';

    if (! phrase || ! phrase.length){
      this.toastrService.clear();
      setTimeout(t => {
        this.toastrService.error('Please enter search criteria');
      }, 350);
      return of(null);
    }

    window['gtag']('event', 'search', {search_term : phrase});

    return this.http.post(`${environment.restBase}/search${searchType}`, { phrase }); 
  }
}
