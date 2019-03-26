import { Email } from './../../interfaces/email.interface';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
    private http: HttpClient
  ) { }

  public sendEmail (email: Email) : Observable<boolean> {
    return <Observable<boolean>> this.http.post(`${environment.restBase}/email/all`, email).pipe(map(response => {
      return true;
    }));

    // return new Observable(observer => {
    //   setTimeout(t => {
    //     observer.next(true);
    //     observer.complete();
    //   }, 1500);
    // });
  }
}
