import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

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

	constructor(
		private http: HttpClient,
		private router: Router
	) { }

	setUser(username: string) {
		this.http.get<User>(`${environment.apiBase}/user/${username}`)
			.subscribe(user => {
				this.user = user;
				console.log('User logged in as', user.username);
			});
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
				this.jwt = res.jwt;
				this.setUser(res.username);
				localStorage.setItem('loggedIn', JSON.stringify(true));

				// Navigate to home or page from where login was triggered
				const loginCallbackUrl = localStorage.getItem('loginCallbackUrl');
				if (loginCallbackUrl != null) {
					localStorage.removeItem('loginCallbackUrl');
					this.router.navigateByUrl(loginCallbackUrl);
				}
				else {
					this.router.navigate(['/home']);
				}
			}, err => {
				console.error('Error logging in: ', err);
				this.router.navigate(['/home']);
			}
		);
	}

	refresh() {
		console.log('stack trace for refresh: ', new Error().stack)
		return this.http.get<AuthResponse>(`${environment.apiBase}/auth/refresh/${environment.environment}`, {
			headers: { 'Content-Type': 'application/json' },
			withCredentials: true,
		}).subscribe(
			res => {
				this.jwt = res.jwt;
				this.setUser(res.username);
				localStorage.setItem('loggedIn', JSON.stringify(true));

				// Navigate to home or page from where login was triggered
				const loginCallbackUrl = localStorage.getItem('loginCallbackUrl');
				if (loginCallbackUrl != null) {
					localStorage.removeItem('loginCallbackUrl');
					this.router.navigateByUrl(loginCallbackUrl);
				}
			}, err => {
				console.log('Refresh failed, likely that user has not previously logged in: ', err);
			}
		);
	}

	loggout() {
		localStorage.setItem('loggedIn', JSON.stringify(false));
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
