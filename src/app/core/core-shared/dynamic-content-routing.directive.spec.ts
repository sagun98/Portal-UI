// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {DynamicContentRoutingDirective} from './dynamic-content-routing.directive';
import {Component, Directive} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  template: `
    <div dynamicContentRouting></div>
  `
})
class DirectiveTestComponent {


}

describe('DynamicContentRoutingDirective', () => {
  let fixture: ComponentFixture<DirectiveTestComponent>;
  let component: DirectiveTestComponent;
  let directiveEl;
  let directive;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        RouterTestingModule
      ],
      declarations: [DynamicContentRoutingDirective, DirectiveTestComponent],
      providers: [
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(DirectiveTestComponent);
    component = fixture.componentInstance;
    directiveEl = fixture.debugElement.query(By.directive(DynamicContentRoutingDirective));
    directive = directiveEl.injector.get(DynamicContentRoutingDirective);
  }));

  it("should run a directive", async(() => {
    expect(component).toBeTruthy();
    expect(directive).toBeTruthy();
  }));

  
});