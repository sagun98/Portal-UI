import { ActivatedRoute } from '@angular/router';
import { AppService } from './../app.service';
import { HttpClientModule } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DocsComponent } from './docs.component';
import { SideNavigationComponent } from '../core/layouts/side-navigation/side-navigation.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('DocsComponent', () => {
  let component: DocsComponent;
  let fixture: ComponentFixture<DocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        ClarityModule,
        FormsModule,
        HttpClientModule
      ],
      declarations: [ 
        DocsComponent,
        SideNavigationComponent,
        
      ],
      providers : [
        AppService,
        {
          provide : ActivatedRoute, useValue : {
            snapshot : {
              data : {
                apisData : [{label : '', description : '', id : '1111'}],
                productData : [{label : '', description : '', id : '1111'}]
              },
              children : [{
                params : {
                  apiId : '1234'
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
});
