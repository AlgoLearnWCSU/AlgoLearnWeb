import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'AlgoLearnWeb';

	constructor(
		private http: HttpClient,
		private route: ActivatedRoute
	) {

	}

	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			if (params['code'] != null) {
				console.log("Logged in!")
			}
		})
	}
}
