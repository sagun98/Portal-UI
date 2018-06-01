import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SideNavigationComponent } from './side-navigation.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SideNavigationComponent', () => {
  let component: SideNavigationComponent;
  let fixture: ComponentFixture<SideNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        FormsModule
      ],
      declarations: [ 
        SideNavigationComponent

      ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
