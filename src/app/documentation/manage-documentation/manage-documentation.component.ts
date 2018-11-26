import { Observable, of } from 'rxjs';
import { DocumentationService } from './../documentation.service';
import { DocumentationArea } from './../../core/interfaces/documentation-area.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Documentation, DefaultDocumentation } from '../../core/interfaces/documentation.interface';
import { EntityComponent } from '../../core/classes/EntityComponent';
import { PermissionsService } from '../../core/services/permissions/permissions.service';
import { TINYCMCE_CONFIG } from '../../docs/constants/tinymce.constant';
import { ToastrService } from '../../../../node_modules/ngx-toastr';
import { UserPrivilegeClass } from '../../core/classes/user-privilege';
import { PortalUser } from '../../core/interfaces/fr-user.interface';

@Component({
  selector: 'app-manage-documentation',
  templateUrl: './manage-documentation.component.html',
  styleUrls: ['./manage-documentation.component.scss']
})
export class ManageDocumentationComponent extends EntityComponent implements OnInit {

  @Input() documentation: Documentation;
  @Input() documentationArea: DocumentationArea;

  public form: FormGroup;
  public submitted: boolean = false;
  public title: string = 'Add Documentation Document';
  public tinymceConfig = TINYCMCE_CONFIG;
  public saveMethod: string = 'createDocumentation';

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

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.documentation = data.Documentation || this.documentation || DefaultDocumentation;
      this.documentationArea = data.DocumentationArea || this.documentationArea;

      if(this.documentation.id){
        this.title = 'Edit ' + this.documentation.name;
        this.saveMethod =  'updateDocumentation';
      }
      else
        this.title = 'Add New ' + this.documentationArea.name + ' Document';
    });

    this.buildForm();

    this.tinymceConfig = Object.assign({}, TINYCMCE_CONFIG, { height: 400, save_onsavecallback: () => { } });
  }

  private buildForm () : void {
    this.form = this.formBuilder.group({
      id : [this.documentation.id],
      version : [this.documentation.version],
      name : [this.documentation.name, [Validators.required, Validators.minLength(5)]],
      slug : [this.documentation.slug, [Validators.required]],
      description : [this.documentation.description, [Validators.required, Validators.minLength(5)]],
      content : [this.documentation.content, [Validators.required]],
      published : [this.documentation.published || false],
      userPrivileges : [this.documentation.userPrivileges || null],
      tags : [this.documentation.tags || []]
    });

    this.form.get('slug').disable();

    this.form.get('name').valueChanges.subscribe(name => {
      if( this.form.get('slug').disabled && ! this.documentation.version)
        this.setSlugValue(name);
    });
  }

  public handleDelete () : void {
    let doDelete = confirm('Are you sure you want to delete this document?');

    if(doDelete)
      this.documentationService.deleteDocumentation(this.documentationArea.id, this.documentation.id).subscribe(d => {
        this.router.navigate(['/documentation/main']);
        this.documentationService.onChange.next(null);
        this.toastrService.success('This Document has benn successfully deleted');
      })
  }

  public getEntityPrivileges () : Observable<Object> {
    return this.documentationService.getPrivileges(this.documentationArea.id, this.documentation.id);
  }

  public saveFineGrainedPrivileges (privileges : UserPrivilegeClass[]) {
    this.documentationService.setUserPrivileges (this.documentationArea.id, this.documentation.id, privileges).subscribe(documentation => {
      this.toastrService.success('API User Privileges successfully updated');
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

    this.documentationService[this.saveMethod](this.documentationArea.id, documentation).subscribe(newDocumentation => {
      this.documentation = newDocumentation;

      this.documentation.userPrivileges = this.documentation.userPrivileges || null;
      this.documentation.tags  = this.documentation.tags || [];

      this.form.setValue(this.documentation);

      this.toastrService.success('Documentation Updated Successfully');

      this.router.navigate([`/documentation/area/${this.documentationArea.slug}/${this.documentation.slug}`]);
      
      this.documentationService.onChange.next(null);
    });
  }

  protected getPermissionService () : PermissionsService {
    return this.permissionsService;
  }
}
