import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetServerModalComponent } from './target-server-modal.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ApigeeTargetServer } from 'src/app/core/interfaces/apigee-targetserver.interface';

describe('TargetServerModalComponent', () => {
  let component: TargetServerModalComponent;
  let fixture: ComponentFixture<TargetServerModalComponent>;
  let targetServer : ApigeeTargetServer  = {
    host : 'host',
    isEnabled : true,
    port : 443,
    name : 'name'
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        ClarityModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      declarations: [ TargetServerModalComponent ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetServerModalComponent);
    component = fixture.componentInstance;
    component.targetServer = targetServer
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
