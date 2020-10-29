import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Problem, ProblemService } from 'src/app/services/problem.service';

@Component({
	selector: 'app-problem-list',
	templateUrl: './problem-list.component.html',
	styleUrls: ['./problem-list.component.scss']
})
export class ProblemListComponent implements OnInit {

	displayedColumns: string[] = ['id', 'name', 'poster', 'description'];
	problems: Problem[];

	constructor(
		private router: Router,
		public problemService: ProblemService
	) { }

	ngOnInit(): void {
		this.problemService.getProblems().subscribe(
			data => this.problems = data,
			err => console.error(err));
	}

	nav(problem: Problem) {
		this.router.navigate(['problem', 'solve', problem.id])
	}
}
