import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationAreaSelectorComponent } from './documentation-area-selector.component';
import { DocumentationArea, DefaultDocumentationArea } from '../../../core/interfaces/documentation-area.interface';
import { DebugElement } from '../../../../../node_modules/@angular/core';

describe('DocumentationAreaSelectorComponent', () => {
  let component: DocumentationAreaSelectorComponent;
  let fixture: ComponentFixture<DocumentationAreaSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ DocumentationAreaSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationAreaSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the appropriate selected documentation area', () => {    
    let documentationAreas: DocumentationArea[] = ['abcd1', 'abcd2', 'abcd3', 'abcd4'].map(id => {
      let tempDA: DocumentationArea = Object.assign({}, DefaultDocumentationArea);
      tempDA.id = id;
      return tempDA;
    });

    const selectedIndex = 0;
    component.documentationAreas = documentationAreas;
    component.documentationArea = documentationAreas[selectedIndex];

    component.ngOnInit();
    fixture.detectChanges();

    const selectElement:DebugElement = fixture.debugElement.queryAll(By.css("select"))[0];

    expect(component.selectedDocumentationArea.id).toEqual(documentationAreas[selectedIndex].id);
    expect(selectElement.children.length).toEqual(4);
  });

  it('should update the selectedDocumentationArea on change', () => {
    let documentationAreas: DocumentationArea[] = ['abcd1', 'abcd2', 'abcd3', 'abcd4'].map(id => {
      let tempDA: DocumentationArea = Object.assign({}, DefaultDocumentationArea);
      tempDA.id = id;
      return tempDA;
    });

    let spy = spyOn(component, 'handleChange').and.callThrough();

    const selectedIndex = 0;
    const afterChangeSelectedIndex = 3;
    component.documentationAreas = documentationAreas;
    component.documentationArea = documentationAreas[selectedIndex];

    component.ngOnInit();
    fixture.detectChanges();

    const selectElement = fixture.debugElement.queryAll(By.css("select"))[0].nativeElement
    selectElement.value = selectElement.options[afterChangeSelectedIndex].value;
    selectElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.handleChange).toHaveBeenCalled();
    expect(component.documentationArea).toEqual(component.documentationAreas[afterChangeSelectedIndex]);
  });
});
