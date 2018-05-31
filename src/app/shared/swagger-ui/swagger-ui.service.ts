import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwaggerUiService {

  constructor() {

  }

  public getSwaggerPaths(swaggerJson) {
    const paths = [];

    const _serviceInstance = this;
    
    if(! swaggerJson || ! swaggerJson.paths)
      return paths;

    Object.keys( swaggerJson.paths ).forEach(_path => {
      Object.keys( swaggerJson.paths[_path] ).forEach(verb => {
        let pathData = swaggerJson.paths[_path][verb];

        pathData.path = _path;
        pathData.verb = verb;
        pathData.open = false;
        pathData.bodyView = 'model';
        pathData.tryItOut = false;

        // get the parameters with the filter:
        // - body
        // - bodyModel
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
              let obj = swaggerJson;
              const jPath:string[] = (pathData.bodyParam.schema.$ref) ? pathData.bodyParam.schema.$ref.replace('#/', '').split('/') : '';

              for(let i=0; i < jPath.length; i++){
                const pathPart = jPath[i];
                obj = obj[pathPart];

                if(! obj)
                  break;
              }

              if(obj && obj.properties)
                obj = _serviceInstance.formatObject(obj.properties);
              else if(pathData.bodyParam.schema.type)
                obj = pathData.bodyParam.schema.type;
              
              return obj;
            }
          },

          bodyModel : {
            get () {
              let obj = swaggerJson;
              let schemaObj;
              const jsonPath:string[] = (pathData.bodyParam.schema.$ref) ? pathData.bodyParam.schema.$ref.replace('#/', '').split('/') : '';

              for(let i=0; i < jsonPath.length; i++){
                const pathPart = jsonPath[i];
                schemaObj = (! schemaObj) ? obj[pathPart] : schemaObj[pathPart];

                if(! schemaObj)
                  break;
              }

              if(schemaObj && schemaObj.properties)
                schemaObj = _serviceInstance.formatModelObject(schemaObj.properties);
              else if(pathData.bodyParam.schema.type)
                schemaObj = pathData.bodyParam.schema.type;
              
              return schemaObj;
            }
          }
        });
        
        paths.push(pathData);
      });
    });

    return paths;
  }

  private formatModelObject(object){
    let obj = {};
    Object.keys(object).forEach(key => {
      const type = object[key].type;
      const nestedObj = object[key].properties;

      if(type === 'object')
        obj[key] = this.formatModelObject(nestedObj);
      
      else
        obj[key] = object[key].type;
    });
    return obj;
  }

  private formatObject(object){
    let obj = {};
    Object.keys(object).forEach(key => {
      const type = object[key].type;
      const nestedObj = object[key].properties;

      if(type === 'object')
        obj[key] = this.formatObject(nestedObj);
      else if(type === 'integer')
        obj[key] = 0;
      else if(type === 'boolean')
        obj[key] = true;
      else
        obj[key] = object[key].type;
    });
    return obj;
  }
}
