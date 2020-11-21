import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Problem, ProblemService, TestCase } from 'src/app/services/problem.service';
import { UserService } from 'src/app/services/user.service';
@Component({
	selector: 'app-problem-form',
	templateUrl: './problem-form.component.html',
	styleUrls: ['./problem-form.component.scss']
})
export class ProblemFormComponent implements OnInit {

	id: number;
	problem: Problem;
	categories: Category[] = [];
	testCases: TestCase[] = [];

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private problemService: ProblemService,
		private userService: UserService
	) { }

	ngOnInit(): void {
		this.problem = {
			id: null,
			name: '',
			poster: this.userService.username,
			description: '',
			reviewed: false
		} as Problem;

		for (let i = 0; i < 3; ++i) {
			this.testCases.push({
				id: null,
				problem: null,
				public: true,
				sampleInput: '',
				sampleOutput: ''
			} as TestCase);
		}

		if (this.router.url.indexOf('edit') !== -1) {
			this.route.params.subscribe(params => {
				this.id = params.id;
				this.problemService.getProblemById(this.id).subscribe(
					problem => {
						this.problem = problem;
					});
				this.problemService.getCategoriesByProblemId(this.id).subscribe(
					categories => {
						this.categories = categories;
					});
				this.problemService.getTestCasesByProblemId(this.id).subscribe(
					testCases => {
						this.testCases = testCases;
						console.log(testCases);
					}
				);
			});
		}
	}

	async submitProblem(form: NgForm) {

		if (form.form.status === 'VALID') {
			if (this.id == null) {
				try {
					this.problem.poster = this.userService.username;
					console.log('Trying to create problem: ', this.problem);
					this.id = (await this.problemService.createProblem(this.problem).toPromise()).id;
					for (const categories of this.categories) {
						categories.problem = this.id;
						this.problemService.createCategory(categories).subscribe(
							res => console.log(`category created: ${res}`),
							err => console.error(err));
					}

					for (const testCase of this.testCases) {
						testCase.problem = this.id;
						this.problemService.createTestCase(testCase).subscribe(
							res => console.log(`Test Case created: ${res}`),
							err => console.error(err));
					}
				} catch (err) {
					console.error(err);
				}
			} else {
				this.problemService.editProblem(this.problem)
					.subscribe(
						res => console.log(`Problem edited: ${res}`),
						err => console.error(err));
				for (const categories of this.categories) {
					this.problemService.editCategory(categories)
						.subscribe(
							res => console.log(`category edited: ${res}`),
							err => console.error(err));
				}
				for (const testCase of this.testCases) {
					this.problemService.editTestCase(testCase)
						.subscribe(
							res => console.log(`Test Case edited: ${res}`),
							err => console.error(err));
				}
			}

		}
	}

	addCategory() {
		this.categories.push({
			id: null,
			name: '',
			problem: null
		} as Category);
	}

	deleteCategory(index) {
		this.categories.splice(index, 1);
	}

	addTestCase() {
		this.testCases.push({
			id: null,
			problem: null,
			public: true,
			sampleInput: '',
			sampleOutput: ''
		} as TestCase);
	}

	deleteTestCase(index) {
		this.testCases.splice(index, 1);
	}

	trackByFn(index, item) {
		return index; // or item.id
	}
}
