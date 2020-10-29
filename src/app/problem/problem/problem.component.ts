import { Component, OnInit, Input } from '@angular/core';

import * as ace from 'ace-builds'; // ace module ..
import 'ace-builds/webpack-resolver';
// language package, choose your own 
import 'ace-builds/src-min-noconflict/mode-javascript';
// ui-theme package
import 'ace-builds/src-min-noconflict/theme-twilight';
import { Problem, ProblemService } from 'src/app/services/problem.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

const THEME = 'ace/theme/twilight';
const LANG = 'ace/mode/javascript';

@Component({
	selector: 'app-problem',
	templateUrl: './problem.component.html',
	styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {
	codeEditor: ace.Ace.Editor;
	problem: Problem;

	constructor(
		private problemService: ProblemService,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		//get problem data from DB
		this.route.params.subscribe(params => {
			if (params['id'] != null)
				this.problemService.getProblemById(params['id']).subscribe(
					problem => {
						this.problem = problem;
					}
				);
		});

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
	}

	getCode() {
		return this.codeEditor.getValue();
	}
}
