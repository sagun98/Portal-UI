import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit {

  public apis: any[] = [];
  public products: any[] = [];

  constructor(
    public appService : AppService,
    private activatedRoute : ActivatedRoute
  ){ }

  ngOnInit(){
    this.apis = this.activatedRoute.snapshot.data.apisData;
    this.products = this.activatedRoute.snapshot.data.productData;
  }

}
