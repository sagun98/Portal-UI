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
  public loadingMessage : string = '';

  constructor(
    private loadingInterceptorService : LoadingInterceptorService
  ) { }

  ngOnInit() {
    this.loadingInterceptorService.$onLoadingTextChange.subscribe(loadingText => {
      this.loadingMessage = loadingText;
    });

    this.loadingInterceptorService.$onRequest.subscribe( (openRequestCount : number) => {
      clearTimeout(this.closeTimeout);

      // Only show the loading overlay if the request(s) haven't returned in this.loadingInterceptorService.startTimeout miliseconds
      if(openRequestCount === 1)
        this.startTimeout = setTimeout( t => {
          this.activeRequestClass = true;

          setTimeout(t=> {t
            let textElement = document.getElementById("loading-text");
            
            textElement.style['display'] = 'inline-block';
            textElement.style['opacity'] = '0';

            if (! textElement.getClientRects().item(0)){
              textElement.style['display'] = 'none';
              return;
            }

            let width = ((textElement.getClientRects().item(0).width / 2) - 40);
            textElement.style['left'] = `calc(50% - ${width}px)`;

            textElement.style['display'] = (width <= 40) ? 'none' : 'inline-block';
            textElement.style['opacity'] = (width <= 40) ? '0' : '1';
          }, 0);

        }, this.loadingInterceptorService.startTimeout);

      
    });

    this.loadingInterceptorService.$onAllRequestsClosed.subscribe( close => {
      // clear the start timeout
      clearTimeout(this.startTimeout);

      this.closeTimeout = setTimeout(t => { this.activeRequestClass = false; }, this.loadingInterceptorService.closeTimeout);
    })
  }

}
