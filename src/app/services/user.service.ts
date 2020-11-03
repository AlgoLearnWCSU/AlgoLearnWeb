import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface User {
	username: string,
	name: string,
	email: string,
	avatar_url: string,
	admin: boolean
}

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private user: User;
	private _jwt: string;

	constructor(
		private http: HttpClient
	) { }

	setUser(username: string) {
		this.http.get<User>(`${environment.apiBase}/user/${username}`)
			.subscribe(user => {
				this.user = user;
			});
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
