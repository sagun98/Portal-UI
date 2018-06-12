import { ApiService } from './../../api/api.service';
import { Component } from '@angular/core';
import { API } from '../../api/interfaces/api.interface';
import { ActivatedRoute } from '@angular/router';
import { TINYCMCE_CONFIG } from '../../constants/tinymce.constant';
import { ERROR_CLASSES } from '../../../core/constants/error-classes.constant';
import { Subject } from 'rxjs/internal/Subject';
import { ProductService } from '../product.service';
import { Product } from '../interfaces/product.interface';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent {

  public activeApi: API;
  public product: Product;
  public apis: any[];

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected productService: ProductService,
    protected apiService : ApiService,
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.apis = data.apiData;
      this.product = <Product>data.product;

      this.activeApi = null;
    });
  }
  
  public getApiDefinition(api, isOpen: boolean) {
    if (!isOpen) {
      this.activeApi = null;
      return;
    }

    this.apiService.getApi(api.id).subscribe((activeApi: API) => {
      this.activeApi = activeApi;
    });
  }

}
