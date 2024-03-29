import { HttpErrorsService } from '../../../../core/services/http-errors/http-errors.service';
import { HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { forkJoin, of, Observable } from 'rxjs';
import { ApigeeClientService } from '../../../../core/services/apigee-client/apigee-client.service';
import { Component, OnInit, Input, Output, OnChanges, EventEmitter, SimpleChanges } from '@angular/core';
import { ApigeeApiKey } from '../../../../core/interfaces/apigee-api-key.interface';
import { ApiService } from '../../../../core/services/api-service/api.service';
import { API } from '../../../../core/interfaces/api.interface';
import { Product } from '../../../../core/interfaces/product.interface';

@Component({
  selector: 'apigee-api-key-modal',
  templateUrl: './apigee-api-key-modal.component.html',
  styleUrls: ['./apigee-api-key-modal.component.scss']
})
export class ApigeeApiKeyModalComponent implements OnInit, OnChanges {
  
  @Input() opened: boolean = false;
  @Input() api: API;
  @Input() product: Product;
  @Input() keyStrategy: string;
  
  @Output() onApiKeyRetrieved: EventEmitter<String> = new EventEmitter<String>();
  @Output() onApiNotInProduct: EventEmitter<String> = new EventEmitter<String>();
  @Output() onClosed: EventEmitter<boolean> = new EventEmitter<boolean>();

  public products: Product[] = [];
  public apiKeys: ApigeeApiKey[] = [];
  public didProductLookup: boolean = false;

  constructor(
    private apiService : ApiService,
    private apigeeClient: ApigeeClientService,
    private httpErrorService: HttpErrorsService
  ) { }

  ngOnInit() {
    if(! this.api && ! this.product)
      throw "An API or Product Entity is required to use this modal";
  }

  ngOnChanges (changes: SimpleChanges) {
    let isOpen = (changes.opened && changes.opened.currentValue);

    if(! isOpen)
      this.cleanUp();

    if(isOpen && this.api)
      this.getApiKeyForApi();

    if(isOpen && this.product)
      this.getApiKeyForProduct();
  }

  private cleanUp () : void {
    this.products = [];
    this.apiKeys = [];
    this.didProductLookup = false;
  }

  private getApiKeyForProduct(): void {
    this.products = [this.product];

    this.apigeeClient.getApiKey(this.product.apiManagementTool.org, this.product).subscribe(
      apiKey => {
        this.apiKeys = [apiKey];
      },
      error => {
        this.httpErrorService.override = true;
        this.apiKeys = [null];
      }
    )
  }

  private getApiKeyForApi () {
    this.apiService.getProducts(this.api).subscribe(products => {
      this.products = products;
      this.didProductLookup = true;

      if (this.products.length) {
        let apiKeyRequests: any[] = [];

        this.products.forEach(product => {

          if(product.apiManagementTool) {
            apiKeyRequests.push( 
              this.apigeeClient.getApiKey(product.apiManagementTool.org, product, this.api.apiManagementTool.id).pipe(
                map((res) => res),
                catchError( (errorResponse : HttpErrorResponse, caught: Observable<HttpEvent<any>>) => {
                  this.httpErrorService.override = true;
                  return of({error : errorResponse.error.message});
                })
              )
            );
          } else {
            apiKeyRequests.push( of({error : true}) );
          }
        });

        if (apiKeyRequests.length) {
          forkJoin(apiKeyRequests).subscribe( 
            (apiKeys: ApigeeApiKey[]) => {
              this.apiKeys = apiKeys;
            }
          );
        }
      }
    });
  }
}
