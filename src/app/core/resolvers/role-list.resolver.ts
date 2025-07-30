import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { RoleService } from "../../shared/services/role.service";

@Injectable({
    providedIn: 'root'
})
export class RoleListResolver implements Resolve<Observable<string[]>> {
    constructor(private roleService: RoleService) {}

    resolve(): Observable<string[]> {
        return this.roleService.getRoles();
    }

}