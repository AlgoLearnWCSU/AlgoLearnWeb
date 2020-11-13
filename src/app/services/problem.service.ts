import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface Problem {
	id: number,
	name: string,
	poster: string,
	description: string,
	reviewed: boolean
	// categories?: string[]
}

export interface Parameter {
	paramId: number,
	name: String,
	problem: number
}

export interface TestCase {
	id: number,
	problem: number,
	public: boolean,
	sampleInput: String,
	sampleOutput: String
}

@Injectable({
	providedIn: 'root'
})
export class ProblemService {

	constructor(
		private http: HttpClient
	) { }

	getProblems() {
		return this.http.get<Problem[]>(`${environment.apiBase}/problem`);
	}

	getProblemById(id: number) {
		return this.http.get<Problem>(`${environment.apiBase}/problem/${id}`);
	}

	getParamsByProblemId(id: number) {
		return this.http.get<Parameter[]>(`${environment.apiBase}/parameter/search?problem=${id}`);
	}

	getTestCasesByProblemId(id: number) {
		return this.http.get<TestCase[]>(`${environment.apiBase}/testcase/search?problem=${id}`);
	}

	createProblem(problem: Problem) {
		return this.http.post<Problem>(`${environment.apiBase}/problem`, problem);
	}

	createParameter(param: Parameter) {
		return this.http.post<Parameter>(`${environment.apiBase}/parameter`, param);
	}

	createTestCase(testCase: TestCase) {
		return this.http.post<TestCase>(`${environment.apiBase}/testcase`, testCase);
	}

	editProblem(problem: Problem) {
		return this.http.put<Problem>(`${environment.apiBase}/problem/${problem.id}`, problem);
	}

	editParameter(param: Parameter) {
		return this.http.put<Parameter>(`${environment.apiBase}/parameter/${param.paramId}`, param);
	}

	editTestCase(testCase: TestCase) {
		return this.http.put<TestCase>(`${environment.apiBase}/testcase/${testCase.id}`, testCase);
	}
}
