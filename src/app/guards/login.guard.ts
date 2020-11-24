import { Injectable } from '@angular/core';
import {
	CanActivate, ActivatedRouteSnapshot,
	RouterStateSnapshot, UrlTree, Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
	providedIn: 'root'
})
export class LoginGuard implements CanActivate {

	constructor(
		private userService: UserService,
		private router: Router
	) { }
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> |
		Promise<boolean | UrlTree> | boolean | UrlTree {
		if (!this.userService.isLoggedIn) {
			return this.router.parseUrl('/problem');
		}
		else {
			return true;
		}
	}

}
