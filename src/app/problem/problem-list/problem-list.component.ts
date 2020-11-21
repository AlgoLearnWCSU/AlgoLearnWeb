import { Component, OnInit } from '@angular/core';
import { Problem, Category, ProblemService } from 'src/app/services/problem.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-problem-list',
	templateUrl: './problem-list.component.html',
	styleUrls: ['./problem-list.component.scss']
})
export class ProblemListComponent implements OnInit {

	reviewedProblems: {
		problem: Problem;
		categories: Category[];
	}[] = [];

	notReviewedProblems: {
		problem: Problem;
		categories: Category[];
	}[] = [];


	constructor(
		public userService: UserService,
		private problemService: ProblemService
	) { }

	ngOnInit(): void {
		this.problemService.getReviewedProblems().subscribe(
			data => {
				for (const problem of data) {
					this.reviewedProblems.push({
						problem,
						categories: []
					});
					const i = this.reviewedProblems.length - 1;
					this.problemService.getCategoriesByProblemId(problem.id).subscribe(
						categories => {
							this.reviewedProblems[i].categories = categories;
						});
				}

			},
			err => console.error(err));

		this.problemService.getNonReviewedProblems().subscribe(
			data => {
				for (const problem of data) {
					this.notReviewedProblems.push({
						problem,
						categories: []
					});
					const i = this.notReviewedProblems.length - 1;
					this.problemService.getCategoriesByProblemId(problem.id).subscribe(
						categories => {
							this.notReviewedProblems[i].categories = categories;
						});
				}
			},
			err => console.error(err));
	}

	deleteProblem(problem: Problem) {
		this.problemService.deleteProblem(problem).subscribe(res => {
			console.log('Deleted problem: ', problem);
		}, err => {
			console.error(err);
		});
	}
}
