import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Product } from '../../core/interfaces/product.interface';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  const mockProduct: Product = {
    id : "asdf1234",
    name : "Mock Product",
    description : "Mock Product Description",
    "userPrivileges" : [],
    "slug" : "mock-product",
    apis : []
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        RouterTestingModule
      ],
      declarations: [ ProductCardComponent ],
      schemas : [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;

    component.product = mockProduct;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct product name', () => {
    const name = document.querySelector(".card-header").innerHTML.trim();

    expect(name).toEqual(mockProduct.name);
  });

  it('should display the correct product description', () => {
    const description = document.querySelector(".card-text").innerHTML.trim();

    expect(description).toEqual(mockProduct.description);
  })
});
