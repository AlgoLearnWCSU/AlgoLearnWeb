import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category, Problem, ProblemService } from './problem.service';

export interface User {
	username: string,
	name: string,
	email: string,
	avatar_url: string,
	admin: boolean
}

export interface AuthResponse {
	username: string,
	jwt: string,
	expires_in: number
}

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private user: User;
	private _jwt: string;

	myPendingReviewedProblems: {
		problem: Problem;
		categories: Category[];
	}[] = [];

	constructor(
		private http: HttpClient,
		private problemService: ProblemService
	) { }

	setUser(username: string) {
		this.http.get<User>(`${environment.apiBase}/user/${username}`)
			.subscribe(user => {
				this.user = user;
				console.log('User logged in as', user.username);
				this.updatePendingProblems();
			});
	}

	updatePendingProblems() {
		if (!this.isLoggedIn) {
			return;
		}
		this.problemService.getNonReviewedProblemsByUsername(this.username).subscribe(
			data => {
				this.myPendingReviewedProblems = [];
				for (const problem of data) {
					this.myPendingReviewedProblems.push({
						problem,
						categories: []
					});
					const i = this.myPendingReviewedProblems.length - 1;
					this.problemService.getCategoriesByProblemId(problem.id).subscribe(
						categories => {
							this.myPendingReviewedProblems[i].categories = categories;
						});
				}
			},
			err => console.error(err));
	}

	getUserByUsername(username: string) {
		return this.http.get<User>(`${environment.apiBase}/user/${username}`);
	}

	login(code: string) {
		return this.http.post<AuthResponse>(`${environment.apiBase}/auth/login/${environment.environment}`, {
			code
		}, {
			headers: { 'Content-Type': 'application/json' },
			withCredentials: true,
		}).subscribe(
			res => {
				this._jwt = res.jwt;
				this.setUser(res.username);
				localStorage.setItem('loggedIn', 'true');
			}, err => {
				console.error('Error logging in: ', err);
			}
		);
	}

	refresh() {
		return this.http.get<AuthResponse>(`${environment.apiBase}/auth/refresh/${environment.environment}`, {
			headers: { 'Content-Type': 'application/json' },
			withCredentials: true,
		}).subscribe(
			res => {
				this.jwt = res.jwt;
				this.setUser(res.username);
				localStorage.setItem('loggedIn', 'true');
			}, err => {
				console.log('Refresh failed, likely that user has not previously logged in: ', err);
			}
		);
	}

	loggout() {
		localStorage.setItem('loggedIn', 'false');
		this._jwt = null;
		this.user = null;
	}

	set jwt(jwt: string) {
		this._jwt = jwt;
	}

	get jwt(): string {
		return this._jwt;
	}

	get isLoggedIn(): boolean {
		return this.user != null;
	}

	get username(): string {
		return this.user ? this.user.username : null;
	}

	get name(): string {
		return this.user ? this.user.name : null;
	}

	get email(): string {
		return this.user ? this.user.email : null;
	}

	get avatar_url(): string {
		return this.user ? this.user.avatar_url : null;
	}

	get isAdmin(): boolean {
		return this.user && this.user.admin;
	}
}
