import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	encapsulation: ViewEncapsulation.None,
	selector: 'app-problem-form',
	templateUrl: './problem-form.component.html',
	styleUrls: ['./problem-form.component.scss']
})
export class ProblemFormComponent implements OnInit {

	create = true;
	parameters: string[] = ["I", "hate", "myself"];
	constructor() { }

	ngOnInit(): void {
	}

	createProblem(form: NgForm) {
		if (form.form.status === "VALID") { }
	}

	deleteParam(index) {

	}
	trackByFn(index, item) {
		return index; // or item.id
	}
}
