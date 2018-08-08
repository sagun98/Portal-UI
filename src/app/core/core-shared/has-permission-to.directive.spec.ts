import { HttpClient, HttpClientModule } from '@angular/common/http';
// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {HasPermissionToDirective} from './has-permission-to.directive';
import {Component, Directive, ElementRef} from '@angular/core';
import {UserService} from './../services/user/user.service';
import { PermissibleEntity } from '../interfaces/permissible.interface';

class MockElementRef extends ElementRef {
  constructor() { super(undefined); }
  nativeElement = {}
}
class MockUserService extends UserService {
}
      
@Component({
  template: `
    <div [hasPermissionTo]="hasPermissionTo" [entity]="entity" ></div>
  `
})
class DirectiveTestComponent {
  hasPermissionTo: string;  
  entity: PermissibleEntity;
}

describe('HasPermissionToDirective', () => {
  let fixture: ComponentFixture<DirectiveTestComponent>;
  let component: DirectiveTestComponent;
  let directiveEl;
  let directive;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        HttpClientModule
      ],
      declarations: [HasPermissionToDirective, DirectiveTestComponent],
      providers: [
        UserService,
        {provide: ElementRef, useClass: MockElementRef}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(DirectiveTestComponent);
    component = fixture.componentInstance;
    directiveEl = fixture.debugElement.query(By.directive(HasPermissionToDirective));
    directive = directiveEl.injector.get(HasPermissionToDirective);
  }));

  it("should run a directive", async(() => {
    expect(component).toBeTruthy();
    expect(directive).toBeTruthy();
  }));

    
  it('should run #ngOnChanges()', async(() => {
    // const result = directive.ngOnChanges();
  }));
      
});