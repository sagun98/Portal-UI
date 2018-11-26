import { ApiService } from '../api/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ERROR_CLASSES } from '../../core/constants/error-classes.constant';
import { API } from '../api/interfaces/api.interface';
import { SearchService, SEARCH_TYPES } from './search.service';
import { Router } from '@angular/router';
import { USER_PERMISSIONS } from '../../core/enums/user-permissions.enum';

@Component({
  selector: 'app-api-search',
  templateUrl: './api-search.component.html',
  styleUrls: ['./api-search.component.scss']
})
export class ApiSearchComponent implements OnInit {

  public initialTerm: string = '';
  public form: FormGroup;
  public errorClasses = ERROR_CLASSES;
  public submitted: boolean = false;
  public finishedSearch: boolean = false;
  public ApiResults: API[] = [];
  public apis: API[] = [];
  public maxBeforeSearch: number = 9;


  constructor(
    private formBuilder : FormBuilder,
    private searchService : SearchService,
    private apiService: ApiService,
    private router : Router
  ) { }

  ngOnInit() {
    this.buildForm();

    this.apis = this.apiService._apis;
  }

  public get permissions () : any {
    return USER_PERMISSIONS;
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      keywords : [this.initialTerm, [Validators.required]]
    });
  }

  public searchApis() {
    const phrase = this.form.get('keywords').value;
    this.searchService.search(phrase, SEARCH_TYPES.API).subscribe( (apis: API[]) => {
      this.finishedSearch = true;
      this.ApiResults = apis;
    });
  }

  public gotoApi ( api: any ) {
    this.router.navigate([`/docs/api/${api.itemId}`]);
  }
}
