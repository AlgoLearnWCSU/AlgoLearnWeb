import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Parameter, Problem, ProblemService } from 'src/app/services/problem.service';

@Component({
	selector: 'app-problem',
	templateUrl: './problem.component.html',
	styleUrls: ['./problem.component.scss']
})
export class ProblemComponent {
	problem: Problem;
	saveId: string;
	params: Parameter[];

	constructor(
		private problemService: ProblemService,
		private route: ActivatedRoute,
	) { }

	ngOnInit() {
		//get problem data from DB
		this.route.params.subscribe(params => {
			if (params.id != null) {
				this.saveId
				this.problemService.getProblemById(params.id).subscribe(
					problem => {
						this.problem = problem;
					}
				);
				this.problemService.getParamsByProblemId(params.id).subscribe(
					params => {
						this.params = params;
					}
				);
			}
		});
	}
}
