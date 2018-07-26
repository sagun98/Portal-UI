import { SlideInOutAnimation } from '../../core/animations/animations';
import { ActivatedRoute } from '@angular/router';
import { PageNotFoundComponent } from '../../core/layouts/page-not-found/page-not-found.component';
import { Component, OnInit, Input } from '@angular/core';
import { SwaggerUiService } from './swagger-ui.service';

@Component({
  selector: 'swagger-ui',
  templateUrl: './swagger-ui.component.html',
  styleUrls: ['./swagger-ui.component.scss'],
  animations: [
    SlideInOutAnimation
  ]
})
export class SwaggerUiComponent implements OnInit {

  @Input() swaggerJson: any = {};
  public paths: any[] = [];

  constructor(
    private activatedRoute : ActivatedRoute,
    private swaggerUiService : SwaggerUiService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      // Only shape the swagger json when the route changes (initial change and subsequent changes)
      setTimeout(t => {
        this.paths = this.swaggerUiService.getSwaggerPaths(this.swaggerJson);
      });
    });
  }  
}
