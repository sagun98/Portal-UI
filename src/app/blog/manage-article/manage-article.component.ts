import { BlogComponent } from './../blog.component';
import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { PortalUser } from "../../core/classes/fr-user.class";
import { TINYCMCE_CONFIG } from "../../docs/constants/tinymce.constant";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../core/services/user/user.service";
import { BlogPost } from "../interfaces/blog-post.interface";
import { BlogService } from "../blog.service";
import { DatePipe } from '@angular/common';

export enum BLOG_CATEGORIES  {
  DOCUMENTATION = 'documentation',
  ANNOUNCEMENT = 'announcement'
}

@Component({
  selector: 'app-manage-article',
  templateUrl: './manage-article.component.html',
  styleUrls: ['./manage-article.component.scss']
})
export class ManageArticleComponent implements OnInit {

  public today : Date = new Date();

  @Input() article: BlogPost = {
    title : '',
    author : '',
    summary : '',
    content : '',
    publicationDate : this.today.getTime(),
    allowComments : false,
    tags : [],
    category : ''
  };

  public categories = ['Announcement', 'Documentation'];

  public subCategories = ['Documentation Landing Page', 'Creating APIs', 'Consuming APIs'];

  public tinymceConfig = TINYCMCE_CONFIG;
  public form : FormGroup;
  public user : PortalUser;
  public submitted: boolean = false;
  public saveMethod: string = 'saveBlogPost';
  public publicationDateString: string = '';

  constructor(
    private formBuilder : FormBuilder,
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private userService : UserService,
    private blogService : BlogService,
    private datePipe : DatePipe
  ) { }

  ngOnInit() {
    this.tinymceConfig = Object.assign({}, TINYCMCE_CONFIG, { height: 200 });

    this.activatedRoute.data.subscribe(data => {
      if(data.BlogPost)
        this.article = data.BlogPost;
      else
        this.article.author = this.userService.$retrievedUser.getValue().fullName;

      this.saveMethod = data.saveMethod || this.saveMethod;
    });

    this.buildForm();
  }

  private buildForm () {
    this.form = this.formBuilder.group({
      id : [this.article.id, []],
      title : [this.article.title, [Validators.required]],
      author : [this.article.author, [Validators.required]],
      publicationDate : [this.publicationDateString, [Validators.required]],
      summary : [this.article.summary, [Validators.required]],
      content : [this.article.content, [Validators.required]],
      tags : [this.article.tags, []],
      category : [this.article.category, [Validators.required]],
      subCategory : [this.article.subCategory, []],
      allowComments : [this.article.allowComments, [Validators.required]]
    });

    this.manageDynamiceValidations();
    this.toggleSubCategoryRequired( this.form.get('category').value );
  }

  // Handle changing validators
  private manageDynamiceValidations () {
    this.form.get('category').valueChanges.subscribe(value => {
      this.toggleSubCategoryRequired(value);
    });
  }

  private toggleSubCategoryRequired (value) {
    const subCategory: FormControl = <FormControl> this.form.get('subCategory');

    switch( value.toLowerCase() ){
      case BLOG_CATEGORIES.ANNOUNCEMENT :
        subCategory.clearValidators()
      case BLOG_CATEGORIES.DOCUMENTATION :
        subCategory.setValidators(Validators.required)
    }
   
    this.form.updateValueAndValidity({
      onlySelf : true,
      emitEvent : false
    });
  }

  public handleSubmit () {

    this.submitted = true;

    if (this.form.invalid)
      return;

    const blogData: BlogPost = this.form.getRawValue();

    blogData.publicationDate = this.setDate( blogData.publicationDate );

    this.blogService[this.saveMethod](blogData).subscribe( (savedBlogPost : BlogPost) => {
      // this.router.navigate([`../${savedBlogPost.id}`]);
      this.router.navigate([`../`], {relativeTo : this.activatedRoute});
    });
  }

  private setDate(date: string) : Date{
    const d = new Date(date);
    const tz = d.getTimezoneOffset() * 60 * 1000;
    const t = d.getTime();
    
    d.setTime(t + tz);

    return d;
  }
}
