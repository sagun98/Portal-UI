import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPageComponent } from './product-page.component';
import { ViewApiComponent } from '../api/view-api/view-api.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CoreSharedModule } from '../../core/core-shared/core-shared.module';
import { UserService } from '../../core/services/user/user.service';
import { MockUserService } from '../../core/layouts/side-navigation/side-navigation.component.spec';

describe('ProductPageComponent', () => {
  let component: ProductPageComponent;
  let fixture: ComponentFixture<ProductPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        SharedModule,
        RouterTestingModule,
        CoreSharedModule,
        HttpClientModule
      ],
      providers : [
        { provide : UserService, useClass : MockUserService, deps : [HttpClient] },
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
