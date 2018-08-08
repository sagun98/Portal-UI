import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
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
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [ 
        HomeComponent
      ],
      providers : [
        HttpClient,
        {
          provide : ActivatedRoute, useValue : {
            data : of({
              NodeBBBlogs : {
                blogs : {
                  topics : []
                },
                generalSupport : {
                  topics : []
                }
              }
            }),
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
