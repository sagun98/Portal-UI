import { LoadingInterceptorService } from './loading-interceptor.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { FadeInOutAnimation } from '../animations/animations';

@Component({
  selector: 'loading-interceptor',
  templateUrl: './loading-interceptor.component.html',
  styleUrls: ['./loading-interceptor.component.scss'],
  animations : [FadeInOutAnimation]

})
export class LoadingInterceptorComponent implements OnInit {
  public activeRequestClass: boolean = false;
  private startTimeout;
  private closeTimeout;

  constructor(
    private loadingInterceptorService : LoadingInterceptorService
  ) { }

  ngOnInit() {
    this.loadingInterceptorService.$onRequest.subscribe( (openRequestCount : number) => {
      clearTimeout(this.closeTimeout);

      // Only show the loading overlay if the request(s) haven't returned in this.loadingInterceptorService.startTimeout miliseconds
      if(openRequestCount === 1)
        this.startTimeout = setTimeout( t => {this.activeRequestClass = true;}, this.loadingInterceptorService.startTimeout);
    });

    this.loadingInterceptorService.$onAllRequestsClosed.subscribe( close => {
      // clear the start timeout
      clearTimeout(this.startTimeout);

      this.closeTimeout = setTimeout(t => { this.activeRequestClass = false; }, this.loadingInterceptorService.closeTimeout);
    })
  }

}
