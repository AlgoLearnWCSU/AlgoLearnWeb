import { OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { CodeEditorComponent } from 'src/app/code-editor/code-editor.component';
import { LoggerService } from 'src/app/services/logger.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { Category, Problem, ProblemService, TestCase } from 'src/app/services/problem.service';
import { Language, Result, Solution, SolutionService } from 'src/app/services/solution.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-problem',
	templateUrl: './problem.component.html',
	styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {

	@ViewChild(CodeEditorComponent) codeEditor: CodeEditorComponent;

	problem: Problem;
	id: number;
	categories: Category[];
	testCases: TestCase[];
	results: Result[];
	loadingSubmit = false;
	loadingResults = false;
	lang: Language;
	solution: Solution;

	constructor(
		private problemService: ProblemService,
		public solutionService: SolutionService,
		public userService: UserService,
		private loggerService: LoggerService,
		private notifierService: NotifierService,
		private route: ActivatedRoute,
	) { }

	ngOnInit() {
		// get problem data from DB
		this.lang = this.solutionService.languages[0];
		this.route.params.subscribe(params => {
			if (params.id != null) {
				this.id = params.id;
				let storedLang: any = localStorage.getItem('lang');
				if (storedLang !== null) {
					storedLang = JSON.parse(storedLang);
					for (let l of this.solutionService.languages) {
						if (l.id == storedLang.id) {
							this.lang = l;
						}
					}
				}
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

	changeLang(lang: MatSelectChange) {
		localStorage.setItem('lang', JSON.stringify(lang.value));
	}

	isTestCasePassed(actual: string, expected: string) {
		if (actual == null || expected == null) {
			return false;
		}
		while (actual.endsWith('\n')) {
			actual = actual.substr(0, actual.length - 1);
		}
		while (expected.endsWith('\n')) {
			expected = expected.substr(0, expected.length - 1);
		}
		return actual === expected;
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
		this.solution = {
			id: null,
			solver: this.userService.username,
			problem: this.problem.id,
			code: this.codeEditor.getCode(),
			languageId: this.lang.id
		};
		if (this.solution.code.length === 0) {
			this.notifierService.addNotification({
				warning: true,
				title: 'Error Submitting Solution',
				message: 'Cannot submit a blank code block'
			});
			return;
		}
		this.loadingSubmit = true;
		const previousSolutions =
			await this.solutionService.getSolutionsByProblemIdAndUserAndLang(
				this.id, this.userService.username, this.lang.id).toPromise();
		if (previousSolutions != null && previousSolutions.length > 1) {
			this.solution.id = previousSolutions[0].id;
		} else {
			this.solution.id = null;
		}
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
				this.waitLoop();
			}, 5000);
			this.loadingSubmit = false;
		} catch (err) {
			this.loadingSubmit = false;
			this.notifierService.addNotification({
				warning: true,
				title: 'Error Submitting Solution',
				message: err && err.message ? err.message : err.toString()
			});
			this.loggerService.logError('Error:\n```' + (err && err.message ? err.message : err.toString())
				+ '```' + (err.stack ? 'Stack:```' + err.stack + '```' : '')).toPromise();
		}
	}

	wait() {
		return new Promise<void>((resolve, reject) => {
			setTimeout(() => resolve(), 2000);
		});
	}

	async waitLoop() {
		try {
			while (true) {
				const res = await this.solutionService.getResultsBySolutionId(this.solution.id).toPromise();
				this.results = res.submissions;
				if (this.results.every(submission => submission.status.id !== 2 && submission.status.id !== 1)) {
					for (let i = 0; i < this.results.length; ++i) {
						if (this.results[i].compile_output != null) {
							this.results[i].compile_output = this.results[i].compile_output.replace('\n', '');
							this.results[i].compile_output = atob(this.results[i].compile_output);
							let temp = '';
							for (let j = 0; j < this.results[i].compile_output.length; ++j) {
								if (this.results[i].compile_output[j] >= '\0' && this.results[i].compile_output[j] <= '~') {
									temp += this.results[i].compile_output[j];
								}
							}
							this.results[i].compile_output = temp;
						}
						if (this.results[i].stdout != null) {
							this.results[i].stdout = window.atob(this.results[i].stdout);
						}
						else {
							this.results[i].stdout = '';
						}
						if (this.results[i].stderr != null) {
							this.results[i].stderr = window.atob(this.results[i].stderr);
						}
					}
					const sol = await this.solutionService.getSolutionById(this.solution.id).toPromise()
					this.solution = sol
					this.loadingResults = false;
					console.log(this.results);
					return;
				}
				await this.wait();
			}
		}
		catch (error) {
			this.handleError(error);
		}
	}
}
