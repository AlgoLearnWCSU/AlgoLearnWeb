import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, Problem, ProblemService } from 'src/app/services/problem.service';

@Component({
	selector: 'app-problem-discussion-page',
	templateUrl: './problem-discussion-page.component.html',
	styleUrls: ['./problem-discussion-page.component.scss']
})
export class ProblemDiscussionPageComponent implements OnInit {

	@Input() id: number;

	categories: Category[];
	problem: Problem;

	constructor(
		private route: ActivatedRoute,
		private problemService: ProblemService
	) { }

	ngOnInit(): void {
		if (!this.id) {
			this.route.params.subscribe(
				params => {
					this.id = params.id;
					this.problemService.getProblemById(params.id).subscribe(
						problem => {
							this.problem = problem;
						}
					);
					this.problemService.getCategoriesByProblemId(params.id).subscribe(
						categories => {
							this.categories = categories;
						}
					);
				},
				err => console.error(err)
			);
		}
	}

}
