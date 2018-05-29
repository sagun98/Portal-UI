import { ActivatedRoute } from '@angular/router';
import { PageNotFoundComponent } from './../../core/layouts/page-not-found/page-not-found.component';
import { Component, OnInit, Input } from '@angular/core';

// TODO: Move this to a module
import { trigger, state, style, transition,
  animate, group, query, stagger, keyframes
} from '@angular/animations';

export const SlideInOutAnimation = [
  trigger('slideInOut', [
    state('1', style({ 'max-height': '500px', opacity: 1 })),
    state('0', style({ 'max-height': '0px', opacity: 0, padding : '0px' })),
    transition(':enter', animate('400ms ease-in-out')),
    transition('* => *', animate('400ms ease-in-out')),
  ]),
]
// End TODO

@Component({
  selector: 'swagger-ui',
  templateUrl: './swagger-ui.component.html',
  styleUrls: ['./swagger-ui.component.scss'],
  animations: [SlideInOutAnimation]
})
export class SwaggerUiComponent implements OnInit {

  @Input() swaggerJson: any = {};
  public paths: any[] = [];

  constructor(
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      setTimeout(t => {
        this.paths = this.getPaths();

        console.log(this.paths);
      });
    });
  }

  public getPaths() {
    const paths = [];
    
    if(! this.swaggerJson || ! this.swaggerJson.paths)
      return paths;

    Object.keys( this.swaggerJson.paths ).forEach(_path => {
      Object.keys( this.swaggerJson.paths[_path] ).forEach(verb => {
        const __this = this;
        let pathData = this.swaggerJson.paths[_path][verb];

        pathData.path = _path;
        pathData.verb = verb;
        pathData.open = false;
        pathData.bodyView = 'example';

        // get the parameters with the filter:
        // - body
        // - query
        // - path

        Object.defineProperties(pathData, {
          bodyParam : {
            get(){
              return pathData.parameters.filter(param => {
                return param.in === 'body'
              })[0];
            }
          },
          
          pathParams : {
            get() {
              return pathData.parameters.filter(param => {
                return /(path)/.test(param.in);
              });
            }
          },

          queryParams : {
            get() {
              return pathData.parameters.filter(param => {
                return /(query)/.test(param.in);
              });
            }
          },

          bodyObject : {
            get () {
              let obj = __this.swaggerJson;
              const jPath:string[] = (pathData.bodyParam.schema.$ref) ? pathData.bodyParam.schema.$ref.replace('#/', '').split('/') : '';

              for(let i=0; i < jPath.length; i++){
                const pathPart = jPath[i];
                obj = obj[pathPart];

                if(! obj)
                  break;
              }

              if(obj && obj.properties)
                obj = formatObject(obj.properties);
              else if(pathData.bodyParam.schema.type)
                obj = pathData.bodyParam.schema.type;
              
              return obj;
            }
          }
        });
        
        paths.push(pathData);
      });
    });

    function formatObject(object){
      let obj = {};
      Object.keys(object).forEach(key => {
        const type = object[key].type;
        const nestedObj = object[key].properties;

        if(type === 'object')
          obj[key] = formatObject(nestedObj);
        else if(type === 'integer')
          obj[key] = 0;
        else if(type === 'boolean')
          obj[key] = true;
        else
          obj[key] = object[key].type;
      });
      return obj;
    }

    return paths;
  }
}
