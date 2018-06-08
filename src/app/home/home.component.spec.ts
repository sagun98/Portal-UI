import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

describe('HomeComponents', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        HttpClientModule
      ],
      declarations: [ 
        HomeComponent
      ],
      providers : [
        HttpClient,
        {
          provide : ActivatedRoute, useValue : {
            snapshot : {
              data : {
                productData : [{name : 'Product 1', description : "This is a description", id : '1234lkasdfa1234adf'}]
              }
            }
          }
        }
      ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have a product', () => {
    const productCards = document.querySelectorAll("product-card");

    expect( component.products.length ).toEqual(1);
    expect( productCards.length ).toEqual(1);
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
