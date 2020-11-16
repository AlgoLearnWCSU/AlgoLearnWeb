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
		private route: ActivatedRoute,
		private userService: UserService
	) { }

	ngOnInit() {
		const loggedIn = localStorage.getItem('loggedIn');
		if (loggedIn == null) {

		}
		else if (loggedIn === 'false') {
			this.route.queryParams.subscribe(params => {
				if (params.code != null) {
					this.userService.login(params.code)
				}
			});
		}
		else if (loggedIn === 'true') {
			this.userService.refresh();
		}
	}
}
