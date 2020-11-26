import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-problem-leaderboard-page',
	templateUrl: './problem-leaderboard-page.component.html',
	styleUrls: ['./problem-leaderboard-page.component.scss']
})
export class ProblemLeaderboardPageComponent implements OnInit {


	@Input() id: number;

	constructor(
		private route: ActivatedRoute
	) { }

	ngOnInit(): void {
		if (!this.id) {
			this.route.params.subscribe(
				params => this.id = params.id,
				err => console.error(err)
			);
		}
	}
}
