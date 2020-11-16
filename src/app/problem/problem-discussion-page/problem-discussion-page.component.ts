import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-problem-discussion-page',
	templateUrl: './problem-discussion-page.component.html',
	styleUrls: ['./problem-discussion-page.component.scss']
})
export class ProblemDiscussionPageComponent implements OnInit {

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
