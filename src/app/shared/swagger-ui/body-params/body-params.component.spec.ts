import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyParamsComponent } from './body-params.component';
import { SwaggerUiService } from '../swagger-ui.service';

describe('BodyParamsComponent', () => {
  let component: BodyParamsComponent;
  let fixture: ComponentFixture<BodyParamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyParamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyParamsComponent);
    component = fixture.componentInstance;
    
    component.path = {
      required : true,
      url : '/test',
      method : 'get',
      name : 'TEST',
      description : 'THIS IS A TEST',
      tryItOut : false,
      bodyView : 'model',
      bodyParam : {},
      bodyModel : {},
      bodyObject : {}
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
