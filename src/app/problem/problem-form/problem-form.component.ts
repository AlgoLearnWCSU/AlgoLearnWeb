import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
	encapsulation: ViewEncapsulation.None,
	selector: 'app-problem-form',
	templateUrl: './problem-form.component.html',
	styleUrls: ['./problem-form.component.scss']
})
export class ProblemFormComponent implements OnInit {

	create = true;
	parameters: string[] = [];
	testCaseInputs: string[] = ['', '', ''];
	testCaseOutputs: string[] = ['', '', ''];

	constructor(
		public userService: UserService
	) { }

	ngOnInit(): void {
	}

	createProblem(form: NgForm) {
		if (form.form.status === "VALID") { }
	}

	addParam() {
		this.parameters.push('');
	}

	deleteParam(index) {
		this.parameters.splice(index, 1);
	}

	addTestCase() {
		this.testCaseInputs.push('');
		this.testCaseOutputs.push('');
	}

	deleteTestCase(index) {
		this.testCaseInputs.splice(index, 1);
		this.testCaseOutputs.splice(index, 1);
	}

	trackByFn(index, item) {
		return index; // or item.id
	}
}
