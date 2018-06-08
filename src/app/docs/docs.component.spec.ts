import { RouterTestingModule } from '@angular/router/testing';
import { DevPortalAPI } from './api/api.model';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DocsComponent } from './docs.component';
import { SideNavigationComponent } from '../core/layouts/side-navigation/side-navigation.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Product } from './product/product.interface';

describe('DocsComponent', () => {
  let component: DocsComponent;
  let fixture: ComponentFixture<DocsComponent>;

  const mockProduct: Product = {
    id : "asdf1234",
    name : "Mock Product",
    description : "Mock Product Description",
    apis : []
  };

  const mockApi: DevPortalAPI = {
    id : "poiu7654",
    name : "Mock API",
    description : "Mock API Description",
  }

  const productId = 'asdf1324';
  const apiId = 'zxcv7890';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        ClarityModule,
        FormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [ 
        DocsComponent,
        SideNavigationComponent,
        
      ],
      providers : [
        {
          provide : ActivatedRoute, useValue : {
            snapshot : {
              data : {
                apisData : [mockApi],
                productData : [mockProduct]
              },
              children : [{
                params : {
                  apiId : apiId,
                  productId : productId
                }
              }]
            },
            children : [
              {
                params : of({})
              }
            ]
          }
        }
      ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set api list data', () => {
    expect( component.apis.length ).toEqual(1);
  });

  it('should set proudct list data', () => {
    expect( component.products.length ).toEqual(1);
  });

  it('should set current product id', () => {
    expect( component.selectedProductId ).toEqual(productId);
  });

  it('should set current product id', () => {
    expect( component.selectedApiId ).toEqual(apiId);
  });
});
