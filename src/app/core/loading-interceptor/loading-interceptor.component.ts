import { LoadingInterceptorService } from './loading-interceptor.service';
import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'loading-interceptor',
  templateUrl: './loading-interceptor.component.html',
  styleUrls: ['./loading-interceptor.component.scss']
})
export class LoadingInterceptorComponent implements OnInit {
  
  @HostBinding('class.activeRequest') activeRequestClass: boolean = false;

  private startTimeout;

  constructor(
    private loadingInterceptorService : LoadingInterceptorService
  ) { }

  ngOnInit() {
    this.loadingInterceptorService.$onRequest.subscribe( (openRequestCount : number) => {
      // Only show the loading overlay if the request(s) haven't returned in this.loadingInterceptorService.startTimeout miliseconds
      if(openRequestCount === 1)
        this.startTimeout = setTimeout( t => {this.activeRequestClass = true;}, this.loadingInterceptorService.startTimeout);
    });

    this.loadingInterceptorService.$onAllRequestsClosed.subscribe( close => {
      // clear the start timeout
      clearTimeout(this.startTimeout);

      setTimeout(t => {
        this.activeRequestClass = false;
      }, this.loadingInterceptorService.closeTimeout);
    })
  }

}
