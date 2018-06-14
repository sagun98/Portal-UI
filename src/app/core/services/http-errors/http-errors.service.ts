import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpErrorMessage } from '../../interfaces/http-error.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorsService {

  public override: boolean = false;
  public $onError: Subject<HttpErrorMessage[]> = new Subject<HttpErrorMessage[]>();

  constructor() { }
}
