import { DOCUMENTATION_LANDING_PAGE_LABEL } from '../../core/constants/documentation.constants';
import { Observable, Subject } from 'rxjs';
import { DocumentationService } from '../documentation.service';
import { DocumentationArea } from '../../core/interfaces/documentation-area.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Documentation, DefaultDocumentation } from '../../core/interfaces/documentation.interface';
import { EntityComponent } from '../../core/classes/EntityComponent';
import { PermissionsService } from '../../core/services/permissions/permissions.service';
import { ToastrService } from 'ngx-toastr';
import { UserPrivilegeClass } from '../../core/classes/user-privilege';
import { PortalUser } from '../../core/interfaces/fr-user.interface';
import { TINYCMCE_CONFIG } from '../../core/constants/tinymce.constant';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-manage-documentation',
  templateUrl: './manage-documentation.component.html',
  styleUrls: ['./manage-documentation.component.scss']
})
export class ManageDocumentationComponent extends EntityComponent implements OnInit, OnDestroy {

  @Input() documentation: Documentation;
  @Input() documentationArea: DocumentationArea;

  public form: FormGroup;
  public submitted: boolean = false;
  public title: string = 'Add Documentation Document';
  public tinymceConfig = TINYCMCE_CONFIG;
  public saveMethod: string = 'createDocumentation';
  public documentationAreas: DocumentationArea[] = [];
  public selectedDocumentationArea: DocumentationArea;
  private unsubscribe: Subject<void> = new Subject();
  
  constructor(
    private activatedRoute : ActivatedRoute,
    private formBuilder : FormBuilder,
    private permissionsService : PermissionsService,
    private documentationService: DocumentationService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    super();
  }

  ngOnDestroy () {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngOnInit() {
    this.documentationService.$positionChange.subscribe(change => {
      if(change.id === this.documentation.id){
        this.documentationService.findDocumentationById(this.documentation.id)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(document => {
          this.toastrService.info('Document position updated.', '', {timeOut : 1500});
          this.form.get('version').setValue(document.version);
        })
      }
    });

    this.documentationService.cache.$documentationAreas.subscribe(documentationAreas => {
      documentationAreas = documentationAreas.filter(documentationarea => {return documentationarea.name !== 'Documentation Landing Page'});
      const clone = JSON.parse(JSON.stringify(documentationAreas));
      let flatDocumentationAreas = this.documentationService.getFlatDocumentationAreas(clone);
      this.documentationAreas = flatDocumentationAreas;
    });

    this.activatedRoute.data.subscribe(data => {
      this.documentation = data.Documentation || this.documentation || DefaultDocumentation;
      this.documentationArea = data.DocumentationArea || this.documentationArea;

      if(this.documentation.id){
        this.title = 'Edit ' + this.documentation.name;
        this.saveMethod =  'updateDocumentation';
      }
      else
        this.title = 'Add New ' + this.documentationArea.name + ' Document';

      if(this.documentation.parentSlug)
        this.selectedDocumentationArea = this.documentationAreas.filter(_documentationArea => {return _documentationArea.slug === this.documentation.parentSlug})[0];
      else
        this.selectedDocumentationArea = this.documentationArea;
    });

    this.buildForm();

    this.tinymceConfig = Object.assign({}, TINYCMCE_CONFIG, { height: '300px', save_onsavecallback: () => { } });
  }

  private buildForm () : void {
    this.form = this.formBuilder.group({
      id : [this.documentation.id],
      version : [this.documentation.version],
      name : [this.documentation.name, [Validators.required, Validators.minLength(4)]],
      slug : [this.documentation.slug, [Validators.required]],
      description : [this.documentation.description, [Validators.required, Validators.minLength(4)]],
      content : [this.documentation.content, [Validators.required]],
      published : [this.documentation.published || false],
      userPrivileges : [this.documentation.userPrivileges || null],
      parentSlug : [this.documentation.parentSlug || null],
      tags : [this.documentation.tags || []]
    });

    this.form.get('slug').disable();

    this.form.get('name').valueChanges.subscribe(name => {
      if( this.form.get('slug').disabled && ! this.documentation.version)
        this.setSlugValue(name);
    });

    this.setInitialContentValue();
  }

  private setInitialContentValue() {
    let initialContentValue = this.form.get('content').value.trim();
    if(initialContentValue === "<p></p>"){
      this.form.get('content').setValue('');
    }
  }

  public handleDelete () : void {
    let doDelete = confirm('Are you sure you want to delete this document?');

    if(doDelete)
      this.documentationService.deleteDocumentation(this.documentationArea.id, this.documentation.id).subscribe(d => {
        this.router.navigate(['/documentation/main']);
        this.documentationService.onChange.next(null);
        this.toastrService.success('This Document has been successfully deleted');
      })
  }

  public getEntityPrivileges () : Observable<Object> {
    return this.documentationService.getPrivileges(this.documentationArea.id, this.documentation.id);
  }

  public saveFineGrainedPrivileges (privileges : UserPrivilegeClass[]) {
    this.documentationService.setUserPrivileges (this.documentationArea.id, this.documentation.id, privileges).subscribe(documentation => {
      this.toastrService.success('API User Privileges successfully updated');
      
      if(this.documentation.parentSlug != documentation.parentSlug) {
        // alert("This Document has been modified in another session.");
        // console.log(this.documentationService.cache.documentationAreas);
        documentation.version = this.documentation.version;
      }

      this.documentation = documentation;
      this.form.get('version').setValue(documentation.version);

    });
  }

  public validateUserRoles = (user : PortalUser) => {
    return (user.roleMap.ADMIN || user.roleMap.DOCUMENTATION_CONTRIBUTOR);
  }

  public saveDocumentation () : void {
    this.submitted = true;

    if(this.form.invalid)
      return;

    let documentation: Documentation = this.form.getRawValue();

    if(this.selectedDocumentationArea)
      documentation.parentSlug = this.selectedDocumentationArea.slug;

    this.documentationService[this.saveMethod](this.selectedDocumentationArea.id, documentation).subscribe(newDocumentation => {
      this.documentation = newDocumentation;

      this.documentation.userPrivileges = this.documentation.userPrivileges || null;
      this.documentation.tags  = this.documentation.tags || [];

      // Clean the docuemtation from any properties that aren't on the form
      const formControlKeys = Object.keys(this.form.controls);
      Object.keys(this.documentation).forEach(key => {
        const index = formControlKeys.indexOf(key);
        if(index == -1)
          delete this.documentation[key];
      });

      this.form.setValue(this.documentation);

      this.toastrService.success('Documentation Updated Successfully');

      if(this.documentationArea.name.toLocaleLowerCase() === DOCUMENTATION_LANDING_PAGE_LABEL)
        this.router.navigate([`/documentation/main`]);
      else
        this.router.navigate([`/documentation/area/${this.documentation.slug}`]);
      
      this.documentationService.onChange.next(null);
    });
  }

  public changeParentDocumentationArea(documentationArea: DocumentationArea) : void {

    if(documentationArea.id !== this.selectedDocumentationArea.id) {
      let doChange:boolean = confirm(`Are you sure you want to change this documents Documentation Area to ${documentationArea.name}?`);

      if(doChange) {
        this.selectedDocumentationArea = documentationArea;
      }
      else {
        setTimeout(t => {
          this.selectedDocumentationArea = Object.assign({}, this.selectedDocumentationArea);
        });
      }
    }
  }

  protected getPermissionService () : PermissionsService {
    return this.permissionsService;
  }
}