import { CookieParserService } from './../../../core/services/cookie-parser/cookie-parser.service';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { DocumentationArea } from './../../../core/interfaces/documentation-area.interface';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { DocumentationAreaComponent } from './documentation-area.component';
import { CoreSharedModule } from '../../../core/core-shared/core-shared.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { DefaultDocumentationArea } from '../../../core/interfaces/documentation-area.interface';
import { Documentation, DefaultDocumentation } from '../../../core/interfaces/documentation.interface';
import { UserService } from '../../../core/services/user/user.service';
import { DocumentationService } from '../../documentation.service';

class MockDocumentationService extends DocumentationService {
  constructor (private _http : HttpClient){
    super(_http);
  }

  public updateDocumentationAreaPosition(id: string, position: number) : Observable<boolean> {
    return <Observable<boolean>> of(true);
  }

  public updateDocumentationPosition(id: string, position: number) : Observable<boolean> {
    return <Observable<boolean>> of(true);
  }
}

class MockUserService extends UserService {
  constructor ( private _http : HttpClient, private _cookieParser : CookieParserService ) {
    super(_http, _cookieParser);
  }

  public adminOverride: boolean = true;

  public isAdmin () : boolean {
    return true;
  }
}

let event:CdkDragDrop<string[]> = {
  previousIndex : 0,
  currentIndex: 1,
  item : null,
  container : null,
  previousContainer : null,
  isPointerOverContainer : false
}


let documentationArea: DocumentationArea = Object.assign({}, DefaultDocumentationArea, {
  id : 'abcd1234',
  documents : [
    <Documentation> Object.assign({}, DefaultDocumentation, {name : "TEST2", position : 2}),
    <Documentation> Object.assign({}, DefaultDocumentation, {name : "TEST0", position : 0}),
    <Documentation> Object.assign({}, DefaultDocumentation, {name : "TEST1", position : 1})
  ]
});

let documentationAreas: DocumentationArea[] = [
  Object.assign({}, DefaultDocumentationArea, {name : "DA0", position : 0}),
  Object.assign({}, DefaultDocumentationArea, {name : "DA2", position : 2}),
  Object.assign({}, DefaultDocumentationArea, {name : "DA4", position : 4}),
  Object.assign({}, DefaultDocumentationArea, {name : "DA3", position : 3}),
  Object.assign({}, DefaultDocumentationArea, {name : "DA1", position : 1})
]

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
      providers : [
        {provide : UserService, useClass : MockUserService, deps : [HttpClient, CookieParserService]},
        {provide : DocumentationService, useClass: MockDocumentationService, deps : [HttpClient]}
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

  it('should drop the document', () => {
    let modifiedDocumentationArea: DocumentationArea = component.dropDocument(event, documentationArea);

    expect(modifiedDocumentationArea.documents[0].position).toEqual(0);
    expect(modifiedDocumentationArea.documents[1].position).toEqual(1);
    expect(modifiedDocumentationArea.documents[2].position).toEqual(2);
  });

  it('should not drop the document', () => {
    component['userService'].isAdmin = () => {return false;}

    let modifiedDocumentationArea: DocumentationArea = component.dropDocument(event, documentationArea);

    expect(modifiedDocumentationArea).toBeNull();
  });

  it('should drop the documentArea', () => {
    let modifiedDocumentationAreas: DocumentationArea[] = component.dropArea(event, documentationAreas);

    modifiedDocumentationAreas.forEach( (documentationArea, index) => {
      expect(documentationArea.position).toEqual(index);
    })
  });

  it('should not drop the documentArea', () => {
    component['userService'].isAdmin = () => {return false;}

    let modifiedDocumentationAreas: DocumentationArea[] = component.dropArea(event, documentationAreas);

    expect(modifiedDocumentationAreas).toBeNull();
  });

  it('should update the state', fakeAsync(() => {
    component.updateState(documentationArea);

    tick(0);

    expect(component.state[documentationArea.id]).toBeTruthy();

    component.updateState(documentationArea);

    tick(0);

    expect(component.state[documentationArea.id]).toBeFalsy();
  }));
});
