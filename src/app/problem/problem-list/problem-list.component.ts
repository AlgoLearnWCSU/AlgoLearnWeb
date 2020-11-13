import { Component, OnInit } from '@angular/core';
import { Problem, ProblemService } from 'src/app/services/problem.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-problem-list',
	templateUrl: './problem-list.component.html',
	styleUrls: ['./problem-list.component.scss']
})
export class ProblemListComponent implements OnInit {

	problems: Problem[];

	constructor(
		public userService: UserService,
		private problemService: ProblemService
	) { }

	ngOnInit(): void {
		this.problemService.getProblems().subscribe(
			data => this.problems = data,
			err => console.error(err));
	}
}
