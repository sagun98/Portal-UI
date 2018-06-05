import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss']
})
export class SideNavigationComponent implements OnInit {

  public apiFilter:string = '';

  @Input() products: any[] = [];
  @Input() apis: any[] = [];
  @Input() selectedApiId: string = '';
  @Input() selectedProductId: string = '';

  @Output() onItemSelected: EventEmitter<any>  = new EventEmitter<any>();

  constructor(
    private router : Router
  ) { }

  ngOnInit() {
  }

  public get apisFiltered () {
    return this.apis
      .map(api => {
        api.label = api.label.replace(/API.*/, '');
        return api;
      })
      .filter(api => {
        const search = new RegExp(this.apiFilter, 'gi');

        return search.test(api.label);
      });
  }

  public addApi($event){
    $event.preventDefault();
    $event.stopPropagation();
  }

  public addProduct($event){
    $event.preventDefault();
    $event.stopPropagation();

    this.router.navigate([`/docs/product/new`]);
  }

}
