import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductApiToolsComponent } from './product-api-tools.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Product } from '../../../../core/interfaces/product.interface';

describe('ProductApiToolsComponent', () => {
  let component: ProductApiToolsComponent;
  let fixture: ComponentFixture<ProductApiToolsComponent>;
  let mockProduct: Product = {
    id : 'asdf1234',
    name : "Mock Product",
    description : 'Mock Product Description',
    slug : 'test',
    userPrivileges : [],
    apis : []
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers : [
        HttpClient
      ],
      declarations: [ ProductApiToolsComponent ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductApiToolsComponent);
    component = fixture.componentInstance;

    component.parentForm = new FormGroup({});
    component.product = mockProduct;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
