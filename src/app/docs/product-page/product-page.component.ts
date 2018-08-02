import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { USER_PERMISSIONS } from '../../core/enums/user-permissions.enum';

@Component({
  selector: 'app-product',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  public products: any[] = [];

  constructor(
    private activatedRoute : ActivatedRoute
  ) { }

  public get permissions (): any {
    return USER_PERMISSIONS;
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.products = data.productData;
    });
  }
}
