import { UserService } from '../services/user/user.service';


export class UserPrivilegesComponentHelper {

    constructor (
        private userService : UserService
    ){}

    public get isAdmin () {
        return this.userService.isAdmin();
    }

}