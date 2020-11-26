import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
	providedIn: 'root'
})
export class LoggerService {

	constructor(
		private http: HttpClient,
		private userService: UserService
	) { }

	logError(message: string) {
		if (message.length > 2000) {
			message = message.substr(0, 1997) + '```';
		}
		return this.http.post('https://discord.com/api/webhooks/780613046543450123/zs3ByIBeC3W36Etwm3bJ_6RhCADgZ9g1jR53U0Zo5KTAO0aIyEtooMoLjc7RzyhlTDcx', {
			content: message,
			username: this.userService.username
		});
	}

}
