import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../docs/product/product.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // TODO: Add type
  public products: Product[] = []

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.products = this.activatedRoute.snapshot.data.productData;
  }

}
