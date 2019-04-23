import { Angulartics2Module, Angulartics2 } from 'angulartics2';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule, NgForm, FormControl, NgModel, FormGroup } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Angulartics2GoogleGlobalSiteTagOverride } from '../../../shared/angulartics-2-google-global-site-tag-override.service';
import { SearchServiceMock } from '../../../docs/api-search/api-search.component.spec';
import { SearchTypes } from './search-types.enum';
import { SearchService } from '../../services/search-service/search.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        ClarityModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        Angulartics2Module.forRoot([Angulartics2GoogleGlobalSiteTagOverride]),
        RouterTestingModule
      ],
      providers : [
        HttpClient,
        ToastrService,
        Angulartics2,
        // {provide: Router, useValue: router},
        {provide : SearchService, useClass : SearchServiceMock, deps : [HttpClient]},
        Angulartics2GoogleGlobalSiteTagOverride

      ],
      declarations: [ HeaderComponent ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default title', () => {
    const title = component.title;
    expect(title).toEqual("Pearson Developer Title");
  });

  it('#showLoginModal()', () => {
    let pass: number = 0;
    component['userService'].$doUserLogin.subscribe(value => {
      pass++;

      if((pass % 2) == 0)
        expect(value).toBeTruthy();
      else
        expect(value).toBeFalsy
    });
    component.showLoginModal();
  });

  it('#activateSearch()', () => {
    component.activateSearch();
    expect(component.activateSearch).toBeTruthy();
    expect(component.hostActiveSearchClass).toBeTruthy();
  });

  it('#openUserSettingsModal()', fakeAsync(() => {
    component.openUserSettingsModal(true);
    tick(100);
    expect(component.userSettingsOpened).toBeTruthy();
  }));

  it('#gotoResult()', fakeAsync(() => {
    component['router'].navigate = () => {
      return new Promise<boolean>((resolve, reject) => {
        resolve(true);
      });
    };

    component.form = new FormGroup({
      'keywords' : new FormControl([])
    });

    component.gotoResult({type : SearchTypes.PRODUCT, slug : '123412341324'});

    tick();

    expect(component.form.get('keywords').value).toEqual('');
    expect(component.searchResults.length).toEqual(0);
    expect(component.hostActiveSearchClass).toBeFalsy();
  }));

  it('#doSearch()', fakeAsync(() => {
    component.doSearch(component._form.form);

    tick();

    expect(component.searchResults.length).toEqual(3);

    tick();

    let evt: Event = new Event('mousedown');
    
    document.dispatchEvent(evt);
  }));
});
