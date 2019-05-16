import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentationAreaComponent } from './documentation-area.component';
import { CoreSharedModule } from '../../../core/core-shared/core-shared.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '../../../../../node_modules/@angular/router/testing';

describe('DocumentationAreaComponent', () => {
  let component: DocumentationAreaComponent;
  let fixture: ComponentFixture<DocumentationAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        CoreSharedModule,
        RouterTestingModule
      ],
      declarations: [ DocumentationAreaComponent ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
