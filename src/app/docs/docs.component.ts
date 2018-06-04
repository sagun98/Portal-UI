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
  public selectedApiId: string = '';
  public selectedProductId: string = '';

  constructor(
    public appService : AppService,
    private activatedRoute : ActivatedRoute
  ){ }

  ngOnInit(){
    this.apis = this.activatedRoute.snapshot.data.apisData;
    this.products = this.activatedRoute.snapshot.data.productData;
    
    // The the selected API / Product ID if they exist
    if(this.activatedRoute.snapshot.children.length){

      // Watch for changes in the route and update the sideNave
      this.activatedRoute.children[0].params.subscribe( params => {
        this.setParams(params);
      });

      this.setParams(this.activatedRoute.snapshot.children[0].params);
    }
  }

  private setParams(params){
    this.selectedApiId = this.activatedRoute.snapshot.children[0].params.apiId;
    this.selectedProductId = this.activatedRoute.snapshot.children[0].params.productId;
  }

}
