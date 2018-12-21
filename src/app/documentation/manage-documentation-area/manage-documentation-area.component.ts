import { DOCUMENTATION_LANDING_PAGE_LABEL } from '../../core/constants/documentation.constants';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentationArea, DefaultDocumentationArea } from '../../core/interfaces/documentation-area.interface';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DocumentationService } from '../documentation.service';
import { Component, OnInit, Input } from '@angular/core';
import { ERROR_CLASSES } from '../../core/constants/error-classes.constant';
import { VerifyFormSavedComponent } from '../../core/classes/verify-form-saved';

@Component({
  selector: 'app-manage-documentation-area',
  templateUrl: './manage-documentation-area.component.html',
  styleUrls: ['./manage-documentation-area.component.scss']
})
export class ManageDocumentationAreaComponent extends VerifyFormSavedComponent implements OnInit {

  @Input() documentationArea: DocumentationArea;

  public errorClasses = ERROR_CLASSES;
  public title : string = 'Create Documentation Area';
  public form : FormGroup;
  public submitted : boolean = false;
  public saveMethod: string = 'createDocumentationArea';

  constructor(
    private documentationAreaService : DocumentationService,
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private formBuilder : FormBuilder
  ) { 
    super();
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.documentationArea = data.DocumentationArea || this.documentationArea || DefaultDocumentationArea;

      if (this.documentationArea.id) {
        this.title = `Edit ${this.documentationArea.name}`;
        this.saveMethod = 'udpateDocumentationArea';
      } 

      this.buildForm();

      this.setFormValues();
    });
  }

  public handleDelete () : void {
    let doDelete = confirm("Are you sure you want to delete this Documentation Area.  All documents under this Documentation Area will be deleted as well.");

    if(doDelete){
      this.documentationAreaService.deleteDocumentationArea(this.documentationArea).subscribe(response => {
        this.documentationAreaService.onChange.next(null);
        this.router.navigate(['/documentation/main']);
      });
    }
  }
  
  public saveDocumentationArea () : void {
    this.submitted = true;

    if(this.form.invalid)
      return;

    let documentationArea = <DocumentationArea> this.form.getRawValue();

    this.documentationAreaService[this.saveMethod](documentationArea).subscribe(documentationArea => {
      this.documentationArea = documentationArea;

      if(documentationArea.name.toLowerCase() === DOCUMENTATION_LANDING_PAGE_LABEL)
        this.documentationAreaService.documentationLandingPageArea = documentationArea;

      this.router.navigate([`/documentation/main`]);
      this.documentationAreaService.onChange.next(null);
    });
  }

  private setFormValues () : void {
    let params: Params = this.activatedRoute.snapshot.queryParams;

    if( Object.keys(params).length ) {
      Object.keys(params).forEach(key => {
        this.form.get(key).setValue(params[key]);
        this.form.get(key).disable();
      });
    }
  }

  private buildForm () : void {
    this.form = this.formBuilder.group({
      id : [this.documentationArea.id, []],
      name : [this.documentationArea.name, [Validators.required, Validators.minLength(5)]],
      description : [this.documentationArea.description, [Validators.required, Validators.minLength(5)]],
      slug : [this.documentationArea.slug, [Validators.required, Validators.minLength(5)]],
      version : [this.documentationArea.version],
      position : [this.documentationArea.position],
      documents : [this.documentationArea.documents]
    });

    this.form.get('slug').disable();

    this.form.get('name').valueChanges.subscribe(name => {
      if( this.form.get('slug').disabled && ! this.documentationArea.version)
        this.setSlugValue(name);
    });
  }

  // Move to service
  private setSlugValue (name?: string) {
    name = name || this.form.get('name').value;
    let slug = name.replace(/[^A-Za-z0-9\s]/gi, '').replace(/\s+/gi, "_").toLowerCase();
    const lastCharacter = slug.substring(slug.length - 1, slug.length);

    if(lastCharacter === '_')
      slug = slug.substring(0, slug.length - 1);

    this.form.get('slug').setValue(slug);
  }
}
