import { Injectable } from "@angular/core";
import { DocsModule } from "..";

@Injectable({providedIn : 'root'})
export class SlugUtilityService {
    consturctor () {}

    public formatSlug (name : string)    : string {
        let slug = name.replace(/[^A-Za-z0-9\s\_]/gi, '').replace(/[\s\_]+/gi, "_").toLowerCase();
        const lastCharacter = slug.substring(slug.length - 1, slug.length);

        if(lastCharacter === '_')
            slug = slug.substring(0, slug.length - 1);
        
        return slug;
    }
}