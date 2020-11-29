import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Problem, Category, ProblemService } from 'src/app/services/problem.service';
import { UserService } from 'src/app/services/user.service';
import { ProblemLeaderboardPageComponent } from '../problem-leaderboard-page/problem-leaderboard-page.component';

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

	activeFilters: string[] = [];
	availableFilters: string[] = [];
	filteredProblems: {
		problem: Problem;
		categories: Category[];
	}[] = [];

	constructor(
		public userService: UserService,
		private problemService: ProblemService
	) { }

	ngOnInit(): void {
		this.getProblems();
	}

	getProblems(): void {
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
							categories.forEach(category => {
								if (!this.availableFilters.some(elem => category.name === elem)) {
									this.availableFilters.push(category.name);
								}
							});
						});
					this.filteredProblems = [...this.reviewedProblems];
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

	filterProblems(): void {
		if (this.activeFilters.length === 0) {
			this.filteredProblems = [...this.reviewedProblems];
		}
		else {
			this.filteredProblems = [];
			this.reviewedProblems.forEach(problem => {
				if (this.activeFilters.every(filter =>
					problem.categories.some(category => category.name === filter))) {
					this.filteredProblems.push(problem);
				}
			});
		}
	}

	addFilter(idx: number): void {
		this.activeFilters.push(this.availableFilters[idx]);
		this.availableFilters.splice(idx, 1);
		this.filterProblems();
	}

	addFilterFromChip(name: string) {
		if (!this.activeFilters.includes(name)) {
			this.addFilter(this.availableFilters.indexOf(name));
		}
	}

	deleteFilter(idx: number): void {
		this.availableFilters.push(this.activeFilters[idx]);
		this.activeFilters.splice(idx, 1);
		this.filterProblems();
	}
}