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
	id: string;
	categories: Category[];
	testCases: TestCase[];
	results: Result[];
	solutionId: number;
	loadingSubmit = false;
	loadingResults = false;
	lang;
	solution;

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
				const storedSolutionId = localStorage.getItem(`solution-id-${this.id}`);
				if (storedSolutionId !== null) {
					this.solutionId = parseInt(storedSolutionId);
				}
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
		this.solution = {
			id: this.solutionId,
			solver: this.userService.username,
			problem: this.problem.id,
			code: this.codeEditor.getCode(),
			languageId: this.lang.id
		};
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
