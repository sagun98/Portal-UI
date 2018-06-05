import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductComponentBase } from './../product.class';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-existing-product',
  templateUrl: './existing-product.component.html',
  styleUrls: ['./existing-product.component.css']
})
export class ExistingProductComponent extends ProductComponentBase implements OnInit {

  constructor(
    protected activatedRoute : ActivatedRoute,
    protected productService : ProductService,
    protected formBuilder : FormBuilder
  ) { 
    super(activatedRoute, productService, formBuilder);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
