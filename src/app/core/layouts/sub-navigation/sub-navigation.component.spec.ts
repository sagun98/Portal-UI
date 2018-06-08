import { ActiveLinkDirective } from './active-link.directive';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SubNavigationComponent } from './sub-navigation.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SubNavigationComponent', () => {
  let component: SubNavigationComponent;
  let fixture: ComponentFixture<SubNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        RouterTestingModule
      ],
      declarations: [
        SubNavigationComponent,
        ActiveLinkDirective 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
