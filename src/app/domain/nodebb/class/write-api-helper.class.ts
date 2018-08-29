import { HttpHeaders } from '@angular/common/http';
import { environment } from "../../../../environments/environment";

export class WriteApiHelper {
    protected apiBase: string;
    protected authorizationHeader = new HttpHeaders().append("Authorization", `Bearer 65af6abb-039f-4b6b-80a8-80490f2a3887`);

    constructor () {

    }

    protected get writeApiBase () {
        return `${environment.forumBase}/${this.apiBase}`;
    }

}