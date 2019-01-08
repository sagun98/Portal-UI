import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManageApiService {

  constructor(
    private http : HttpClient
  ) { }

  public getSwaggerVersion (file?: File, swaggerUrl?: string) : Observable<number> {
    if (! file && ! swaggerUrl)
      return of(null);

    return this._getSwaggerVersion(file, swaggerUrl);
  }

  private _getSwaggerVersion(file: File, swaggerUrl?: string) : Observable<number> {
    return new Observable<number>(observer => {

      if (file && file.name)
        this.getVersionFromFile(file, observer)
      
      else if(swaggerUrl){
        this.http.get(`${swaggerUrl}`).subscribe(
          fileContents => {
          
            let version: number;

            if (swaggerUrl.endsWith(".yaml") || swaggerUrl.endsWith(".yml") )
              version = this.getYamlVersion(fileContents);
            
            else if (swaggerUrl.endsWith(".json"))
              version = this.getJsonVersion(fileContents);

            else
              version = this.getJsonVersion(JSON.stringify(fileContents));

            observer.next(version);
            observer.complete();
          },
          error => {
            observer.next(2);
            observer.complete();
          }
        );
      }
    });
  }


  private getVersionFromFile (file, observer) {
    let version: number;
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");

    reader.onload =  (evt:any) => {
      if(file.name.endsWith(".yaml") || file.name.endsWith(".yml"))
        version = this.getYamlVersion( evt.target.result );

      else if(file.name.endsWith(".json"))
        version = this.getJsonVersion( evt.target.result );

      observer.next(version);
      observer.complete();
    }
    reader.onerror = function (evt) {
      observer.next(null);
      observer.complete();
    }
  }

  private getJsonVersion (content) : number {
    const jsonContent = ((typeof content) === "string") ?  JSON.parse(content) : content;

    return (jsonContent.swagger && /2.0/.test(jsonContent.swagger)) ? 2 : (jsonContent.openapi && /2.0/.test(jsonContent.openapi)) ? 3 : null;
  }

  private getYamlVersion (content) : number {
    const lines: string[] = content.split(/\n/);
    let versionLine: string = '';
    
    for(let i = 0; i < lines.length; i++){
      const line = lines[i];
      if( /(swagger\s?:|openapi\s?:)/.test(line) ){
        versionLine = line;
        break;
      }
    }

    return /2.0/.test(versionLine) ? 2 : /3.0/.test(versionLine) ? 3 : null;
  }
}
