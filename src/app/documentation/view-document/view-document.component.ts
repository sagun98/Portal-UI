import { Documentation } from './../../core/interfaces/documentation.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.scss']
})
export class ViewDocumentComponent implements OnInit {

  @Input() documentation : Documentation;

  constructor(
    private activatedRoute : ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.documentation = data.Documentation || this.documentation;
    });
  }

  public get safeContent () {
    return this.domSanitizer.bypassSecurityTrustHtml( this.documentation.content );
  }
}
