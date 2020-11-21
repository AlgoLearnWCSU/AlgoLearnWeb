import { Injectable } from '@angular/core';
import {
	HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class Interceptor implements HttpInterceptor {

	constructor(
		private userService: UserService
	) { }

	intercept(req: HttpRequest<any>, next: HttpHandler):
		Observable<HttpEvent<any>> {
		if (this.userService.isLoggedIn) {
			req = req.clone({
				setHeaders: {
					'auth-token': this.userService.jwt
				}
			});
		}
		return next.handle(req);
	}
}