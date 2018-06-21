import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogSideNavigationComponent } from './blog-side-navigation.component';

describe('BlogListComponent', () => {
  let component: BlogSideNavigationComponent;
  let fixture: ComponentFixture<BlogSideNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogSideNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogSideNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
