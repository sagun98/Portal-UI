import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiSearchResultsComponent } from './api-search-results.component';
import { SearchResultsTest } from '../api-search.component.spec';

describe('ApiSearchResultsComponent', () => {
  let component: ApiSearchResultsComponent;
  let fixture: ComponentFixture<ApiSearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiSearchResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiSearchResultsComponent);
    component = fixture.componentInstance;
    component.apis = SearchResultsTest;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render results', () => {
    const cards = document.querySelectorAll(".card");
    expect(cards.length).toEqual(3);
  })
});
