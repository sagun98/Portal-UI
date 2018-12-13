import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreSharedModule } from '../../core/core-shared/core-shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewDocumentComponent } from './view-document.component';
import { ActivatedRoute } from '@angular/router';
import { DefaultDocumentation } from '../../core/interfaces/documentation.interface';

describe('ViewDocumentComponent', () => {
  let component: ViewDocumentComponent;
  let fixture: ComponentFixture<ViewDocumentComponent>;
  let mockDocument = Object.assign({
    userPrivileges : []
  }, DefaultDocumentation);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        RouterTestingModule,
        HttpClientModule,
        CoreSharedModule
      ],
      providers : [
        HttpClient,
        {provide : ActivatedRoute, useValue : {
            data : of({
              Documentation : mockDocument
            }),
            snapshot : {}
          }
        }
      ],
      declarations: [ ViewDocumentComponent ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});