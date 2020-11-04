import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import * as ace from 'ace-builds'; // ace module ..
import 'ace-builds/webpack-resolver';
// language package, choose your own 
import 'ace-builds/src-min-noconflict/mode-javascript';
// ui-theme package
import 'ace-builds/src-min-noconflict/theme-twilight';
import { Problem, ProblemService } from 'src/app/services/problem.service';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';

const THEME = 'ace/theme/twilight';
const LANG = 'ace/mode/javascript';

@Component({
	selector: 'app-problem',
	templateUrl: './problem.component.html',
	styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit, OnDestroy {
	codeEditor: ace.Ace.Editor;
	problem: Problem;
	saveSubscription: Subscription;

	constructor(
		private problemService: ProblemService,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		//init the code editor
		const editorOptions: Partial<ace.Ace.EditorOptions> = {
			highlightActiveLine: true,
			minLines: 20,
			maxLines: Infinity,
		};
		this.codeEditor = ace.edit('code-editor', editorOptions);
		this.codeEditor.setTheme(THEME);
		this.codeEditor.getSession().setMode(LANG);
		this.codeEditor.setShowFoldWidgets(true);

		//get problem data from DB
		this.route.params.subscribe(params => {
			if (params['id'] != null)
				this.problemService.getProblemById(params['id']).subscribe(
					problem => {
						this.problem = problem;

						// Load saved code if it exists
						const oldCode = localStorage.getItem(`code_${problem.id}`);
						if (oldCode != null) {
							this.codeEditor.setValue(oldCode);
						}

						// Save new code whenever use inputs it
						this.saveSubscription = interval(1000).subscribe(() => {
							localStorage.setItem(
								`code_${problem.id}`,
								this.getCode());
						});
					}
				);
		});
	}

	ngOnDestroy() {
		// Stop listenting to user code when they leave page
		this.saveSubscription.unsubscribe();
	}

	getCode() {
		return this.codeEditor.getValue();
	}
}
