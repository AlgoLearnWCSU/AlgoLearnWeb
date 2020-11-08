import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Problem, ProblemService } from 'src/app/services/problem.service';

@Component({
	selector: 'app-problem',
	templateUrl: './problem.component.html',
	styleUrls: ['./problem.component.scss']
})
export class ProblemComponent {
	problem: Problem;
	saveId: string;

	constructor(
		private problemService: ProblemService,
		private route: ActivatedRoute,
	) { }

	ngOnInit() {
		//get problem data from DB
		this.route.params.subscribe(params => {
			if (params['id'] != null)
				this.problemService.getProblemById(params['id']).subscribe(
					problem => {
						this.problem = problem;
						this.saveId = `problem: ${problem.id}`;
					}
				);
		});
	}
}
