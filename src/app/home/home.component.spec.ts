import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductCardComponent } from './product-card/product-card.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';

describe('HomeComponents', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        HttpClientModule
      ],
      declarations: [ 
        HomeComponent, 
        ProductCardComponent
      ],
      providers : [
        HttpClient,
        {
          provide : ActivatedRoute, useValue : {
            snapshot : {
              data : {
                productData : [{label : 'Product 1', description : "This is a description", id : '1234lkasdfa1234adf'}]
              }
            }
          },
          AppService
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
