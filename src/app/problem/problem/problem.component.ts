import { OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CodeEditorComponent } from 'src/app/code-editor/code-editor.component';
import { LoggerService } from 'src/app/services/logger.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { Category, Problem, ProblemService, TestCase } from 'src/app/services/problem.service';
import { Result, Solution, SolutionService } from 'src/app/services/solution.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-problem',
	templateUrl: './problem.component.html',
	styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {

	@ViewChild(CodeEditorComponent) codeEditor: CodeEditorComponent;

	problem: Problem;
	id: string;
	categories: Category[];
	testCases: TestCase[];
	results: Result[];
	solution: Solution = {
		id: null,
		solver: this.userService.username,
		problem: null,
		code: '',
		languageId: 63,
		tokens: ''
	};
	loadingSubmit = false;
	loadingResults = false;

	constructor(
		private problemService: ProblemService,
		private solutionService: SolutionService,
		public userService: UserService,
		private loggerService: LoggerService,
		private notifierService: NotifierService,
		private route: ActivatedRoute,
	) { }

	ngOnInit() {
		// get problem data from DB
		this.route.params.subscribe(params => {
			if (params.id != null) {
				this.id = params.id;
				const storedSolutionId = localStorage.getItem(`solution-id-${this.id}`);
				if (storedSolutionId !== null) {
					this.solution.id = parseInt(storedSolutionId);
				}
				this.solution.problem = parseInt(this.id);
				this.problemService.getProblemById(params.id).subscribe(
					problem => {
						this.problem = problem;
					}
				);
				this.problemService.getCategoriesByProblemId(params.id).subscribe(
					categories => {
						this.categories = categories;
					}
				);
				this.problemService.getTestCasesByProblemId(params.id).subscribe(
					testCases => {
						this.testCases = testCases;
					}
				);
			}
		});
	}

	handleError(err) {
		this.loadingSubmit = false;
		this.loadingResults = false;
		this.notifierService.addNotification({
			warning: true,
			title: 'Error Creating Problem',
			message: err && err.message ? err.message : err.toString()
		});
		this.loggerService.logError('Error:\n```' + (err && err.message ? err.message : err.toString())
			+ '```' + (err.stack ? 'Stack:```' + err.stack + '```' : '')).toPromise();
	}

	async runCode() {
		this.loadingSubmit = true;
		this.solution.code = this.codeEditor.getCode();
		this.solution.solver = this.userService.username;
		this.results = null;
		try {
			if (this.solution.id == null) {
				this.solution = await this.solutionService.createSolution(this.solution).toPromise();
			} else {
				this.solution = await this.solutionService.editSolution(this.solution).toPromise();
			}
			localStorage.setItem(`solution-id-${this.id}`, this.solution.id.toString());
			this.loadingResults = true;
			setTimeout(() => {
				this.solutionService.getResultsBySolutionId(this.solution.id).subscribe(res => {
					this.results = res.submissions;
					this.solutionService.getSolutionById(this.solution.id).subscribe(
						sol => {
							this.solution = sol
							this.loadingResults = false;
						}, this.handleError
					);
				}, this.handleError);
			}, 5000);
			this.loadingSubmit = false;
		} catch (err) {
			this.loadingSubmit = false;
			this.notifierService.addNotification({
				warning: true,
				title: 'Error Creating Problem',
				message: err && err.message ? err.message : err.toString()
			});
			this.loggerService.logError('Error:\n```' + (err && err.message ? err.message : err.toString())
				+ '```' + (err.stack ? 'Stack:```' + err.stack + '```' : '')).toPromise();
		}
	}
}
