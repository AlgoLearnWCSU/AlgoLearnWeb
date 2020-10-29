import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-problem-list',
	templateUrl: './problem-list.component.html',
	styleUrls: ['./problem-list.component.scss']
})
export class ProblemListComponent implements OnInit {

	displayedColumns: string[] = ['id', 'name', 'poster', 'description'];
	problems: {
		id: number,
		name: string,
		poster: string,
		description: string,
		categories: string[]
	}[] = [
			{
				id: 0,
				name: 'Sort array',
				poster: 'jack',
				description: 'Sort a list of integers.',
				categories: ['Array', 'Sort']
			},
			{
				id: 1,
				name: 'Search array',
				poster: 'ty',
				description: 'Find an element from an unsorted array of integers and return index or -1 if unfound.',
				categories: ['Array', 'Search']
			},
			{
				id: 2,
				name: 'Search sorted array',
				poster: 'john',
				description: 'Find an element from a sorted array of integers and return index or -1 if unfound.',
				categories: ['Array', 'Search']
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

	test() {
		console.log("HOVERED");
	}

}
