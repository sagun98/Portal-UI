import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface LoadingOptions {
  startTimeout? : number,
  closeTimeout? : number
}

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptorService {

  public activeRequestMap : any = {};
  public $onRequest:  Subject<any> = new Subject<any>();
  public $onResponse: Subject<any> = new Subject<any>();
  public $onAllRequestsClosed: Subject<any> = new Subject<any>();
  public $onLoadingTextChange: Subject<string> = new Subject<string>();

  private options: LoadingOptions = {
    startTimeout : 500,
    closeTimeout : 500
  };

  constructor() { }

  get startTimeout() {
    return this.options.startTimeout;
  }

  get closeTimeout() {
    return this.options.closeTimeout;
  }

  public addOpenRequest (requestId : number) {
    this.activeRequestMap[requestId] = true;
    const openRequestCount = Object.keys(this.activeRequestMap).length;
    this.$onRequest.next(openRequestCount);
  }

  public closeOpenRequest (requestId? : number) {
    if(! requestId)
      this.activeRequestMap = {};

    delete this.activeRequestMap[requestId];

    const openRequestCount = Object.keys(this.activeRequestMap).length;

    this.$onResponse.next(openRequestCount);

    if(openRequestCount === 0)
      this.$onAllRequestsClosed.next();
  }

  public setOptions (options : LoadingOptions) {
    this.options = Object.assign(this.options, options);
  }
  
}
