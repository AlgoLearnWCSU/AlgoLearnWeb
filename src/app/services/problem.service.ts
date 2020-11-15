import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface Problem {
	id: number;
	name: string;
	poster: string;
	description: string;
	reviewed: boolean;
	// categories?: string[]
}

export interface Parameter {
	paramId: number;
	name: string;
	problem: number;
}

export interface TestCase {
	id: number;
	problem: number;
	public: boolean;
	sampleInput: string;
	sampleOutput: string;
}

export interface Comment {
	id: number;
	commenter: string;
	problem: number;
	timestamp: string;
	comment: string;
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

	getCommentsByProblemId(id: number) {
		return this.http.get<Comment[]>(`${environment.apiBase}/comment/search?problem=${id}`);
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

	createComment(comment: Comment) {
		return this.http.post<Comment>(`${environment.apiBase}/comment`, comment);
	}

	editProblem(problem: Problem) {
		return this.http.put<Problem>(`${environment.apiBase}/problem/${problem.id}`,
			problem);
	}

	editParameter(param: Parameter) {
		return this.http.put<Parameter>(`${environment.apiBase}/parameter/${param.paramId}`, param);
	}

	editTestCase(testCase: TestCase) {
		return this.http.put<TestCase>(`${environment.apiBase}/testcase/${testCase.id}`, testCase);
	}

	editComment(comment: Comment) {
		return this.http.put<Comment>(`${environment.apiBase}/comment/${comment.id}`,
			comment);
	}
}
