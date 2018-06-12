import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { ProductComponentBase } from '../product.class';
import { Product } from '../interfaces/product.interface';
import { TINYCMCE_CONFIG } from '../../constants/tinymce.constant';
import { API } from '../../api/interfaces/api.interface';
import { ApiService } from '../../api/api.service';
import { ERROR_CLASSES } from '../../../core/constants/error-classes.constant';

@Component({
  selector: 'app-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit{

  public activeApi: API;
  public product: Product;
  public apis: any[];
  public form: FormGroup;
  public tinymceConfig = TINYCMCE_CONFIG;
  public errorClasses = ERROR_CLASSES;
  public submitted: boolean = false;
  public showOverview: boolean = false;
  public saveMethod: string = 'addProduct';

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected productService: ProductService,
    protected apiService : ApiService,
    protected formBuilder: FormBuilder,
    protected router : Router
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.apis = data.apiData;
      this.saveMethod = data.saveMethod;
      this.product = <Product>data.product || <Product>{
        overview: ''
      };

      this.activeApi = null;
      this.showOverview = (this.product.overview && this.product.overview.length) ? true : false;
    });
    this.tinymceConfig = Object.assign({}, TINYCMCE_CONFIG, { height: 200, save_onsavecallback: () => { } });
    this.buildForm();
  }

  protected buildForm() {
    this.form = this.formBuilder.group({
      id: [this.product.id],
      version: [this.product.version, []],
      name: [this.product.name, [Validators.required]],
      description: [this.product.description, [Validators.required]],
      overview: [this.product.overview],
      apis: [this.product.apis, [Validators.required]]
    });
  }

  public saveProduct() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    if (!this.showOverview)
      this.form.get('overview').setValue('');

    const productData = this.form.getRawValue();

    this.productService[this.saveMethod](productData).subscribe((product: Product) => {
      this.router.navigate([`/docs/product/${product.id}`]);
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
