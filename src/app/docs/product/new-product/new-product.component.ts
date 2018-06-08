import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { ProductComponentBase } from '../product.class';
import { Product } from '../product.interface';


@Component({
  selector: 'app-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent extends ProductComponentBase implements OnInit{

  // These exist in the ProductComponentBase class (this is just for reference)
  // public activeApi: any = null;
  // public product: Product;
  // public apis: any[];
  // public form: FormGroup;
  // public tinymceConfig = TINYCMCE_CONFIG;
  // public errorClasses = ERROR_CLASSES;
  // public submitted: boolean = false;

  constructor(
    protected activatedRoute : ActivatedRoute,
    protected productService : ProductService,
    protected formBuilder : FormBuilder,
    protected router: Router
  ) { 
    super(activatedRoute, productService, formBuilder);
  }

  ngOnInit () {
    super.ngOnInit();

    this.$onProductSaved.subscribe( (product: Product) => {      
      this.router.navigate([`/docs/product/${product.id}`]);
    });
  }
}
