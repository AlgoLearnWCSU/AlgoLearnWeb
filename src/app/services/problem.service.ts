import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Solution } from 'src/app/services/solution.service'

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
	timestamp: Date;
	comment: string;
}

export interface Category {
	id: number;
	problem: number;
	name: string;
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

	getReviewedProblems() {
		return this.http.get<Problem[]>(`${environment.apiBase}/problem/search?reviewed=true`);
	}

	getNonReviewedProblems() {
		return this.http.get<Problem[]>(`${environment.apiBase}/problem/search?reviewed=false`);
	}

	getNonReviewedProblemsByUsername(username: String) {
		return this.http.get<Problem[]>(`${environment.apiBase}/problem/search?reviewed=false&poster=${username}`);
	}

	getProblemById(id: number) {
		return this.http.get<Problem>(`${environment.apiBase}/problem/${id}`);
	}


	getTestCasesByProblemId(id: number) {
		return this.http.get<TestCase[]>(`${environment.apiBase}/testcase/search?problem=${id}`);
	}

	getCommentsByProblemId(id: number) {
		return this.http.get<Comment[]>(`${environment.apiBase}/comment/search?problem=${id}`);
	}

	getCategoriesByProblemId(id: number) {
		return this.http.get<Category[]>(`${environment.apiBase}/category/search?problem=${id}`);
	}

	getSolutionsByProblemId(id: number) {
		return this.http.get<Solution[]>(`${environment.apiBase}/solution/search?problem=${id}`);
	}

	createProblem(problem: Problem) {
		return this.http.post<Problem>(`${environment.apiBase}/problem`, problem);
	}

	createCategory(category: Category) {
		return this.http.post<Category>(`${environment.apiBase}/category`, category);
	}

	createTestCase(testCase: TestCase) {
		return this.http.post<TestCase>(`${environment.apiBase}/testcase`, testCase);
	}

	createComment(comment: Comment) {
		return this.http.post<Comment>(`${environment.apiBase}/comment`, comment);
	}

	editProblem(problem: Problem) {
		return this.http.patch<Problem>(`${environment.apiBase}/problem/${problem.id}`,
			problem);
	}

	editCategory(category: Category) {
		return this.http.patch<Category>(`${environment.apiBase}/category/${category.id}`, category);
	}

	editTestCase(testCase: TestCase) {
		return this.http.patch<TestCase>(`${environment.apiBase}/testcase/${testCase.id}`, testCase);
	}

	editComment(comment: Comment) {
		return this.http.patch<Comment>(`${environment.apiBase}/comment/${comment.id}`,
			comment);
	}

	deleteProblem(problem: Problem) {
		return this.http.delete(`${environment.apiBase}/problem/${problem.id}`);
	}

	deleteCategory(category: Category) {
		return this.http.delete(`${environment.apiBase}/category/${category.id}`);
	}

	deleteTestCase(testCase: TestCase) {
		return this.http.delete(`${environment.apiBase}/testcase/${testCase.id}`);
	}

	deleteCommentByCommentId(id: number) {
		return this.http.delete<Comment>(`${environment.apiBase}/comment/${id}`);
	}
}
