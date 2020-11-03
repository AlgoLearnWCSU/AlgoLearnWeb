import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user.service';

@Component({
	selector: 'app-user-hub',
	templateUrl: './user-hub.component.html',
	styleUrls: ['./user-hub.component.scss']
})
export class UserHubComponent implements OnInit {

	client_id = environment.gitHubClientId;

	constructor(
		private router: Router,
		public userService: UserService
	) { }

	ngOnInit(): void {
	}

	saveRoute() {
		localStorage.setItem('loginCallbackUrl', this.router.url);
	}

}
