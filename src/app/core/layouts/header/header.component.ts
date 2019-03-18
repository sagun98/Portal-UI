import { UserCardComponent } from '../user-card/user-card.component';
import { Router } from '@angular/router';
import { SearchService } from '../../../docs/api-search/search.service';
import { Component, OnInit, Input, HostBinding, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import {  Observable, Subscription } from 'rxjs';
import { PortalUser } from '../../interfaces/fr-user.interface';
import { NgForm, FormGroup } from '@angular/forms';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { ToastrService } from 'ngx-toastr';
import { SearchTypes } from './search-types.enum';
import { Angulartics2GoogleGlobalSiteTagOverride } from '../../../shared/angulartics-2-google-global-site-tag-override.service';
import { HttpErrorsService } from '../../services/http-errors/http-errors.service';

@Component({
  selector: 'dev-portal-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title: string = 'Pearson Developer Title';
  @HostBinding('class.active-search') hostActiveSearchClass: boolean;
  @ViewChild('globalSearchResults') searchDropDown: ElementRef;
  @ViewChild('portalSearch') portalSearchInput: ElementRef;
  // @ViewChild(UserCardComponent) userCardComponent: UserCardComponent;
  @ViewChildren(UserCardComponent) userCardQuery: QueryList<UserCardComponent>;
  @ViewChild('form') _form: NgForm;

  public loggedIn: boolean = false;
  public user: PortalUser;
  public activeSearch: boolean = false;
  public searchResults: any[] = [];
  public form : FormGroup;
  public userSettingsOpened : boolean = false;

  public docmousedown: Observable<Event>;
  public subscriber: Subscription = new Subscription();

  constructor(
    private angulartics2GoogleGlobalSiteTag: Angulartics2GoogleGlobalSiteTagOverride,
    private userService : UserService,
    private searchService : SearchService,
    private toastrService : ToastrService,
    private httpErrorsServices : HttpErrorsService,
    private router : Router
  ) { }

  ngOnInit() {
    this.userService.$retrievedUser.subscribe( (user:PortalUser) => {
      this.user = user;
      this.loggedIn = (user) ? true : false;
    });
  }

  public showLoginModal() {
    this.userService.$doUserLogin.next( false );
    setTimeout(t => {this.userService.$doUserLogin.next( true  );})
  }

  public activateSearch () {
    this.activeSearch = true;
    this.hostActiveSearchClass = true;
  }

  public doSearch (form: any) {
    this.form = form;
    const phrase: string = (form.controls['keywords']) ? form.controls['keywords'].value : '';
    
    this.searchService.search(phrase).subscribe( (results: any[]) => {

      results = this.eliminateDuplicates(results);

      this.searchResults = results || [];

      if(results && results.length)
        this.addEventListener();
      else if(! results)
        return;
      else
        this.toastrService.warning('No Results Found.  Please refine your search and try again', '');
    },
    error => {
      this.httpErrorsServices.override = true;
      this.toastrService.warning('You must be logged in to search.')
    }
    );
  }

  public addEventListener() {
    this.docmousedown = fromEvent(document, 'mousedown');

    if(this.subscriber)
      this.subscriber.unsubscribe();

    this.subscriber = this.docmousedown.subscribe((e: Event) => {
      // e.stopPropagation();
      // e.preventDefault();

      if(! this.searchDropDown)
        return;

      const target = <Node> e.target
      const searchDropDownElement: HTMLElement = <HTMLElement> this.searchDropDown.nativeElement;
      const searchInputElement: HTMLElement = <HTMLElement> this.portalSearchInput.nativeElement;

      const outsideClicked = (! searchDropDownElement.contains(target) && ! searchInputElement.contains(target));

      if (outsideClicked){
        this.searchResults = [];
        this.subscriber.unsubscribe();
      }
    });
  }

  public gotoResult (result : any) {

    const url = (result.type === SearchTypes.PRODUCT) ? '/docs/apicollections/' + result.slug :
                (result.type === SearchTypes.DOCUMENTATION) ? '/documentation/area/' + result.slug :
                (result.type === SearchTypes.FORUM) ? '/forum/topic/' + result.slug :
                (result.type === SearchTypes.API) ? `/docs/api/${result.slug}/version/${result.version}` : '';

    this.router.navigate([`${url}`]).then(navigated => {
      if(navigated){
        this.searchResults = [];
        this.form.controls.keywords.setValue('');
        this.hostActiveSearchClass = false;
        this.subscriber.unsubscribe();
      }
    })
  }

  public logout () {
    const doLogout = confirm('Do you really want to logout?');

    if(doLogout){
      this.userService.logout().subscribe( response =>  {

        window['gtag']('config', 'UA-123646740-1', {'custom_map': {'dimension1': 'username'}});

        this.angulartics2GoogleGlobalSiteTag.eventTrack('logout', {
          category : 'userAction',
          label : 'logout',
          value : this.user,
          gstCustom : {
            username : this.user.username
          }
        });

      });
    }
  }

  public openUserSettingsModal (opened : boolean) {
    this.userSettingsOpened = false;
    setTimeout(t => { this.userSettingsOpened = opened; }); 
  }

  /**
   * These two methods could be moved to a service
   */

  private eliminateDuplicates (results: any[]) : any[] {
    const numOfResults = results.length;
      let idMap = {};

      for(let i = (numOfResults-1) ; i >= 0; i--) {
        const result = results[i];
        
        if(result.type === SearchTypes.API && ! idMap[result.itemId]) {
          idMap[result.itemId] = result.version;
        }
        else if (result.type === SearchTypes.API && idMap[result.itemId]) {
          if ( this.versionGTE(idMap[result.itemId], result.version)) {
            results.splice(i,1);
          } else {
            for(let j = (results.length-1) ; j >= 0; j--) {
              if (results[j].itemId == result.itemId && results[j].version == idMap[result.itemId]){
                results.splice(j,1);
                break;
              }
            }
            idMap[result.itemId] = result.version;
          }
        }
      }

    return results;
  }

  private versionGTE (v1, v2) : boolean {

    let arr1 = v1.split(".");
    let arr2 = v2.split(".");

    let i = 0;
    while (i < arr1.length || i < arr2.length) {
      if(i<arr1.length && i<arr2.length){
        if(parseInt(arr1[i]) < parseInt(arr2[i])){
          return false;
        }else if(parseInt(arr1[i]) > parseInt(arr2[i])){
          return true;
        }
      }
      
      else if(i<arr1.length){
        if(parseInt(arr1[i]) != 0){
          return true;
        }
      }
      
      else if(i<arr2.length){
        if(parseInt(arr2[i]) != 0){
              return false;
          }
      }
      
      i++;
    }

    return true;
  }
}