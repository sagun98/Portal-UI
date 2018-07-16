import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from './../../shared/shared.module';
import { ProductCardComponent } from './../../shared/product-card/product-card.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPageComponent } from './product-page.component';
import { ViewApiComponent } from '../api/view-api/view-api.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ProductPageComponent', () => {
  let component: ProductPageComponent;
  let fixture: ComponentFixture<ProductPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        SharedModule,
        RouterTestingModule
      ],
      declarations: [ 
        ProductPageComponent
      ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
