import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-user-hub',
	templateUrl: './user-hub.component.html',
	styleUrls: ['./user-hub.component.scss']
})
export class UserHubComponent implements OnInit {

	client_id = environment.gitHubClientId;

	constructor() { }

	ngOnInit(): void {
	}

}
