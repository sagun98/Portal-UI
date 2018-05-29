import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'swagger-ui',
  templateUrl: './swagger-ui.component.html',
  styleUrls: ['./swagger-ui.component.scss']
})
export class SwaggerUiComponent implements OnInit {

  @Input() swaggerJson: any = {};

  constructor() { }

  ngOnInit() {
  }

  public get paths() {
    const paths = []

    if(! this.swaggerJson || ! this.swaggerJson.paths)
      return paths;

    Object.keys( this.swaggerJson.paths ).forEach(_path => {
      Object.keys( this.swaggerJson.paths[_path] ).forEach(verb => {
        let pathData = this.swaggerJson.paths[_path][verb];

        pathData.path = _path;
        pathData.verb = verb;

        paths.push(pathData);
      });
    });

    return paths;
  }

}
