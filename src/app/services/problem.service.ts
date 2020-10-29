import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface Problem {
	id: number,
	// name: string,
	poster: string,
	description: string,
	reviewed: boolean
	// categories?: string[]
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
}
