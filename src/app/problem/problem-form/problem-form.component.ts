import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggerService } from 'src/app/services/logger.service';
import { NotifierService } from 'src/app/services/notifier.service';
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
	mode: string = 'Create';
	loadingSubmit = false;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private problemService: ProblemService,
		private userService: UserService,
		private notifierService: NotifierService,
		private loggerService: LoggerService
	) { }

	ngOnInit(): void {
		this.problem = {
			id: null,
			name: '',
			poster: this.userService.username,
			description: '',
			reviewed: false
		} as Problem;

		if (this.router.url.indexOf('edit') !== -1) {
			this.mode = 'Edit';

		} else if (this.router.url.indexOf('review') !== -1) {
			this.mode = 'Review';
		}
		if (this.mode != 'Create') {
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
					}
				);
			});
		} else {
			for (let i = 0; i < 3; ++i) {
				this.testCases.push({
					id: null,
					problem: null,
					public: true,
					sampleInput: '',
					sampleOutput: ''
				} as TestCase);
			}
		}
	}

	handleError(err) {
		this.loadingSubmit = false;
		this.notifierService.addNotification({
			warning: true,
			title: 'Error Creating Problem',
			message: err && err.message ? err.message : err.toString()
		});
		this.loggerService.log('Error:\n```' + (err && err.message ? err.message : err.toString())
			+ '```' + (err.stack ? 'Stack:```' + err.stack + '```' : ''));
	}

	handleSuccess() {
		this.loadingSubmit = false;
		this.notifierService.addNotification({
			warning: false,
			title: 'Success',
			message: `Problem ${this.mode == 'Create' ? 'creat' : this.mode.toLowerCase()}ed`
		});
		this.router.navigate(['problem']);
	}

	async submitProblem(form: NgForm) {
		if (form.form.status === 'VALID') {
			this.loadingSubmit = true;
			if (this.mode == 'Create') {
				try {
					this.problem.poster = this.userService.username;
					this.id = (await this.problemService.createProblem(this.problem).toPromise()).id;

					const promsiseArray = [];

					for (const categories of this.categories) {
						categories.problem = this.id;
						promsiseArray.push(this.problemService.createCategory(categories).toPromise());
					}

					for (const testCase of this.testCases) {
						testCase.problem = this.id;
						promsiseArray.push(this.problemService.createTestCase(testCase).toPromise());
					}

					await Promise.all(promsiseArray);
					this.handleSuccess();
				} catch (err) {
					this.handleError(err);
				}
			} else if (this.mode == 'Edit') {
				try {
					const promsiseArray = [];
					promsiseArray.push(this.problemService.editProblem(this.problem).toPromise());
					for (const category of this.categories) {
						category.problem = this.id
						if (category.id != null)
							promsiseArray.push(this.problemService.editCategory(category).toPromise());
						else
							promsiseArray.push(this.problemService.createCategory(category).toPromise());
					}
					for (const testCase of this.testCases) {
						testCase.problem = this.id
						if (testCase.id != null)
							promsiseArray.push(this.problemService.editTestCase(testCase).toPromise());
						else
							promsiseArray.push(this.problemService.createTestCase(testCase).toPromise());
					}

					await Promise.all(promsiseArray);
					this.handleSuccess();
				} catch (err) {
					this.handleError(err);
				}
			} else if (this.mode == 'Review') {
				try {
					const promsiseArray = [];
					this.problem.reviewed = true;
					promsiseArray.push(this.problemService.editProblem(this.problem).toPromise());
					for (const category of this.categories) {
						category.problem = this.id
						if (category.id != null)
							promsiseArray.push(this.problemService.editCategory(category).toPromise());
						else
							promsiseArray.push(this.problemService.createCategory(category).toPromise());
					}
					for (const testCase of this.testCases) {
						testCase.problem = this.id
						if (testCase.id != null)
							promsiseArray.push(this.problemService.editTestCase(testCase).toPromise());
						else
							promsiseArray.push(this.problemService.createTestCase(testCase).toPromise());
					}

					await Promise.all(promsiseArray);
					this.handleSuccess();
				} catch (err) {
					this.handleError(err);
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
		if (this.mode != 'Create' && this.categories[index].id != null) {
			this.problemService.deleteCategory(this.categories[index]).toPromise().catch(
				() => this.notifierService.addNotification({
					warning: true,
					title: 'Error',
					message: 'Issue deleting category'
				})
			);
		}
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
		if (this.mode != 'Create' && this.testCases[index].id != null) {
			this.problemService.deleteTestCase(this.testCases[index]).toPromise().catch(
				() => this.notifierService.addNotification({
					warning: true,
					title: 'Error',
					message: 'Issue deleting test case'
				}));
		}
		this.testCases.splice(index, 1);
	}

	trackByFn(index, item) {
		return index; // or item.id
	}
}
