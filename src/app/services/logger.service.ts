import { HttpClient } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
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

	logContactUs(message: string) {
		if (message.length > 2000) {
			message = message.substr(0, 2000);
		}
		return this.http.post('https://discord.com/api/webhooks/781327691763679273/DqnDI5K2vvoSS9MZ0SW33ZV7ip1bjBCazfHcu2DrlfavCK3H-Mep1jZClm22UKoCnYWW', {
			content: message,
			username: this.userService.username
		});
	}
}
