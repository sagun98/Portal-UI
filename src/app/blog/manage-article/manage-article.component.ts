import { PortalUser } from './../../core/classes/fr-user.class';
import { FRUser } from './../../core/interfaces/fr-user.interface';
import { Component, OnInit, Input } from '@angular/core';
import { TINYCMCE_CONFIG } from '../../docs/constants/tinymce.constant';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Article } from '../interfaces/article.interface';
import { UserService } from '../../core/services/user/user.service';

@Component({
  selector: 'app-manage-article',
  templateUrl: './manage-article.component.html',
  styleUrls: ['./manage-article.component.scss']
})
export class ManageArticleComponent implements OnInit {

  @Input() article: Article = { content : '' };
  public tinymceConfig = TINYCMCE_CONFIG;
  public form : FormGroup;
  public user : PortalUser;

  constructor(
    private formBuilder : FormBuilder,
    private userService : UserService
  ) { }

  ngOnInit() {
    this.tinymceConfig = Object.assign({}, TINYCMCE_CONFIG, { height: 200 });

    this.userService.user.subscribe( (user: PortalUser) => {
      this.user = user;
    });

    this.buildForm();
  }

  private buildForm () {
    this.form = this.formBuilder.group({
      id : [],
      title : [],
      author : [this.user.fullName, []],
      summary : [],
      content : [],
      tags : [],
      category : []
    });
  }

}
