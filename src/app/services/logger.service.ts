import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
	providedIn: 'root'
})
export class LoggerService {

	constructor(
		private http: HttpClient,
		private userService: UserService
	) { }

	log(message: string) {
		this.http.post('https://discord.com/api/webhooks/780613046543450123/zs3ByIBeC3W36Etwm3bJ_6RhCADgZ9g1jR53U0Zo5KTAO0aIyEtooMoLjc7RzyhlTDcx', {
			content: message,
			username: this.userService.username
		}).subscribe(() => { }, err => console.error('Couldn\'t log: ', err));
	}

}
