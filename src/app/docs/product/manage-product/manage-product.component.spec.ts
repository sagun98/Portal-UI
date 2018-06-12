import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { Product } from '../interfaces/product.interface';
import { ManageProductComponent } from './manage-product.component';
import { API } from '../../api/interfaces/api.interface';
import { ViewApiComponent } from '../../api/view-api/view-api.component';


describe('NewProductComponent', () => {
  let component: ManageProductComponent;
  let fixture: ComponentFixture<ManageProductComponent>;

  const saveMethod = 'saveProduct';

  const mockProduct: Product = {
    id : 'asdf1234',
    name : "Mock Product",
    description : 'Mock Product Description',
    apis : []
  }

  const mockApis: API[] = [{
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
        ManageProductComponent,
        ViewApiComponent
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
    fixture = TestBed.createComponent(ManageProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
