import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Problem, ProblemService } from 'src/app/services/problem.service';

@Component({
	selector: 'app-problem',
	templateUrl: './problem.component.html',
	styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {
	problem: Problem;
	saveId: string;
	categories: Category[];

	constructor(
		private problemService: ProblemService,
		private route: ActivatedRoute,
	) { }

	ngOnInit() {
		// get problem data from DB
		this.route.params.subscribe(params => {
			if (params.id != null) {
				this.saveId = params.id;
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
			}
		});
	}
}
