import { Component, OnInit, Input, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';

import * as ace from 'ace-builds'; // ace module ..
import 'ace-builds/webpack-resolver';
// language package, choose your own 
import 'ace-builds/src-min-noconflict/mode-javascript';
// ui-theme package
import 'ace-builds/src-min-noconflict/theme-twilight';
import { interval, Subscription } from 'rxjs';

@Component({
	selector: 'app-code-editor',
	templateUrl: './code-editor.component.html',
	styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements AfterViewInit, OnDestroy, OnChanges {

	@Input() theme = 'ace/theme/twilight';
	@Input() lang = 'ace/mode/javascript'
	@Input() id = 0;
	@Input() saveId: string;
	@Input() disabled = false;
	@Input() code = '';
	@Input() minLines = 20;
	@Input() maxLines = Infinity;

	codeEditor: ace.Ace.Editor;
	saveSubscription: Subscription;

	constructor() { }

	ngAfterViewInit() {
		// Set init to run async
		Promise.resolve(null).then(() => {
			//init the code editor
			const editorOptions: Partial<ace.Ace.EditorOptions> = {
				highlightActiveLine: true,
				minLines: this.minLines,
				maxLines: this.maxLines,
			};

			this.codeEditor = ace.edit(`code-editor-${this.id}`, editorOptions);
			this.codeEditor.setTheme(this.theme);
			if (this.lang) {
				this.codeEditor.getSession().setMode(this.lang);
			}
			this.codeEditor.setShowFoldWidgets(true);

			if (this.disabled) {
				this.codeEditor.container.style.pointerEvents = "none";
				this.codeEditor.renderer.setStyle("disabled", true);
				this.codeEditor.blur();
			}

			if (this.saveId != null) {
				// Load saved code if it exists
				const oldCode = localStorage.getItem(this.saveId);
				if (oldCode != null) {
					this.codeEditor.setValue(oldCode);
				}

				// Save new code whenever use inputs it
				this.saveSubscription = interval(1000).subscribe(() => {
					localStorage.setItem(this.saveId, this.getCode());
				});
			}

			if (this.code != null) {
				this.codeEditor.setValue(this.code);
			}

			this.codeEditor.selection.clearSelection();

		});
	}


	ngOnChanges(change) {
		if (this.codeEditor == null) {
			return;
		}
		else if (change.disabled) {
			if (this.disabled) {
				this.codeEditor.container.style.pointerEvents = "none";
				this.codeEditor.renderer.setStyle("disabled", true);
				this.codeEditor.blur();
			} else {
				this.codeEditor.container.style.pointerEvents = "auto";
				this.codeEditor.renderer.setStyle("disabled", false);
			}
		} else if (change.saveId && this.saveId) {
			if (this.saveSubscription != null)
				this.saveSubscription.unsubscribe();
			// Load saved code if it exists
			const oldCode = localStorage.getItem(this.saveId);
			if (oldCode != null) {
				this.codeEditor.setValue(oldCode);
			}
			// Save new code whenever use inputs it
			this.saveSubscription = interval(1000).subscribe(() => {
				localStorage.setItem(this.saveId, this.getCode());
			});
		} else if (change.lang && this.lang) {
			this.codeEditor.getSession().setMode(this.lang);
		}
		else if (change.theme && this.theme) {
			this.codeEditor.setTheme(this.theme);
		} else if (change.code && this.code) {
			this.codeEditor.setValue(this.code);
		}
	}

	ngOnDestroy() {
		if (this.saveSubscription != null) {
			// Stop listenting to user code when they leave page
			this.saveSubscription.unsubscribe();
		}
	}

	getCode() {
		if (this.codeEditor)
			return this.codeEditor.getValue();
		else
			return '';
	}

}
