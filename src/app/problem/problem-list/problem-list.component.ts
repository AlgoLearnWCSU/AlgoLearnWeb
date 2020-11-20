import { Component, OnInit } from '@angular/core';
import { Problem, Category, ProblemService } from 'src/app/services/problem.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-problem-list',
	templateUrl: './problem-list.component.html',
	styleUrls: ['./problem-list.component.scss']
})
export class ProblemListComponent implements OnInit {

	problems: {
		problem: Problem;
		categories: Category[];
	}[] = [];


	constructor(
		public userService: UserService,
		private problemService: ProblemService
	) { }

	ngOnInit(): void {
		this.problemService.getProblems().subscribe(
			data => {
				for (const problem of data) {
					this.problems.push({
						problem,
						categories: []
					});
					const i = this.problems.length - 1;
					this.problemService.getCategoriesByProblemId(problem.id).subscribe(
						categories => {
							this.problems[i].categories = categories;
						});
				}

			},
			err => console.error(err));
	}
}
