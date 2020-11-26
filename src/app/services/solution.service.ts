import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface Solution {
	id: number;
	solver: string;
	problem: number;
	code: string;
	languageId: number;
	tokens: string;
	passedTests?: number;
	avgCompTime?: number;
}

export interface Result {
	stdout?: string;
	time?: string;
	memory?: number;
	stderr?: string;
	token?: string;
	status?: {
		id?: number;
		description?: string;
	};
}

@Injectable({
	providedIn: 'root'
})
export class SolutionService {
	constructor(
		private http: HttpClient
	) { }

	getSolutionById(id: number) {
		return this.http.get<Solution>(`${environment.apiBase}/solution/${id}`);
	}

	getSolutionsByUsernameAndProblem(id: number) {
		return this.http.get<Solution[]>(`${environment.apiBase}/solution/${id}`);
	}

	getResultsBySolutionId(id: number) {
		return this.http.get<{ submissions: Result[] }>(`${environment.apiBase}/solution/result/${id}`);
	}

	getSolutionsByProblemId(problem: number) {
		return this.http.get<Solution[]>(`${environment.apiBase}/solution/search?problem=${problem}`);
	}

	createSolution(solution: Solution) {
		return this.http.post<Solution>(`${environment.apiBase}/solution`, solution);
	}

	editSolution(solution: Solution) {
		return this.http.patch<Solution>(`${environment.apiBase}/solution/${solution.id}`, solution);
	}
}
