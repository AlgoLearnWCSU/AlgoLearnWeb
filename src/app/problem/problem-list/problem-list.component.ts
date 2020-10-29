import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { prependListener } from 'process';

@Component({
	selector: 'app-problem-list',
	templateUrl: './problem-list.component.html',
	styleUrls: ['./problem-list.component.scss']
})
export class ProblemListComponent implements OnInit {

	problems = [
		{
			id: 0,
			name: 'my prob 1',
			poster: 'jack',
			description: 'do a thing',
		},
		{
			id: 1,
			name: 'my prob 2',
			poster: 'ty',
			description: 'do 2 things',
		},
		{
			id: 2,
			name: 'my prob 3',
			poster: 'john',
			description: 'do 3 things',
		}
	]

	constructor(
		private router: Router
	) { }

	ngOnInit(): void {
	}

	nav(problem: {
		id: number,
		name: string,
		poster: string,
		description: string
	}) {
		this.router.navigate(['problem', 'solve', problem.id])
	}

}
