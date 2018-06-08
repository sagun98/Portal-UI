import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DevPortalAPI } from './../../api/api.model';
import { ActivatedRoute } from '@angular/router';
import { ApiComponent } from './../../api/api.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExistingProductComponent } from './existing-product.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Product } from '../product.interface';
import { of } from 'rxjs/observable/of';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditorModule } from '@tinymce/tinymce-angular';

describe('ExistingProductComponent', () => {
  let component: ExistingProductComponent;
  let fixture: ComponentFixture<ExistingProductComponent>;

  const saveMethod = 'updateProduct';

  const mockProduct: Product = {
    id : 'asdf1234',
    name : "Mock Product",
    description : 'Mock Product Description',
    apis : []
  }

  const mockApis: DevPortalAPI[] = [{
    id : 'qwers12345',
    name : 'Mock API',
    description : 'Mock API Description',
  }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        FormsModule,
        ReactiveFormsModule,
        ClarityModule,
        HttpClientModule,
        RouterTestingModule,
        NgSelectModule,
        EditorModule
      ],
      declarations: [
        ExistingProductComponent,
        ApiComponent
      ],
      providers : [
        {
          provide : ActivatedRoute, useValue : {
            snapshot : {
              data : {
                apis : mockApis,
                prodcut : mockProduct,
                saveMethod : saveMethod
              }
            },
            data : of({
              apis : mockApis,
              prodcut : mockProduct,
              saveMethod : saveMethod
            })
          }
        }
      ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
