import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieParserService {

  public cookies: any = {};

  constructor() {
    document.cookie.split(';').forEach(kvp => {
      this.cookies[kvp.split('=')[0].trim()] = kvp.split('=')[1]; 
    });
  }

}
