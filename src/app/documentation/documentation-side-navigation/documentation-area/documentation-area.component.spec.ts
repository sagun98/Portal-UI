import { HttpClientModule } from '@angular/common/http';
import { DocumentationArea } from './../../../core/interfaces/documentation-area.interface';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentationAreaComponent } from './documentation-area.component';
import { CoreSharedModule } from '../../../core/core-shared/core-shared.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '../../../../../node_modules/@angular/router/testing';
import { DefaultDocumentationArea } from '../../../core/interfaces/documentation-area.interface';

describe('DocumentationAreaComponent', () => {
  let component: DocumentationAreaComponent;
  let fixture: ComponentFixture<DocumentationAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        CoreSharedModule,
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [ DocumentationAreaComponent ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let documentationAreas: DocumentationArea[] = [Object.assign({}, DefaultDocumentationArea, {slug : 'test'})];
    fixture = TestBed.createComponent(DocumentationAreaComponent);
    component = fixture.componentInstance;
    component.documentationAreas = documentationAreas;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('The depth should be 1', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.depth).toEqual(1);
  })

  it('The depth should be 2', () => {
    component.documentationAreas[0].slug = 'test/test1_1';
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.depth).toEqual(2);
  })
});
