import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { ProductCardComponent } from './../../shared/product-card/product-card.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductPageComponent } from './product-page.component';
import { Product } from '../product/product.interface';
import { of } from 'rxjs/observable/of';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ProductPageComponent', () => {
  let component: ProductPageComponent;
  let fixture: ComponentFixture<ProductPageComponent>;

  const mockProducts: Product[] = [{
    id : 'asdf1324',
    name : 'Mock Product',
    description : 'Mock Product Definition',
    apis : []
  }]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        FormsModule,
        RouterTestingModule
      ],
      declarations: [ 
        ProductPageComponent,
        ProductCardComponent
      ],
      providers : [
        {
          provide : ActivatedRoute, useValue : {
            data : of({
              productData : mockProducts
            })
          }
        }
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
