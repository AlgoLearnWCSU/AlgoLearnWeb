import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'AlgoLearnWeb';

	constructor(
		private http: HttpClient,
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService
	) {

	}

	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			if (params['jwt'] != null && params['username'] != null) {
				// Set user info
				this.userService.jwt = params['jwt'];
				this.userService.setUser(params['username']);

				// Log sign in
				console.log(`Logged in as ${params['username']}!`, params['jwt']);

				// Navigate to home or page from where login was triggered
				const loginCallbackUrl = localStorage.getItem('loginCallbackUrl');
				if (loginCallbackUrl != null) {
					localStorage.removeItem('loginCallbackUrl');
					this.router.navigateByUrl(loginCallbackUrl);
				}
				else {
					this.router.navigate([]);
				}
			}
		})
	}
}
