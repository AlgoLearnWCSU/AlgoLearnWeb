import { Injectable } from '@angular/core';

export interface Notification {
	warning: boolean;
	title: string;
	message: string;
}

@Injectable({
	providedIn: 'root'
})
export class NotifierService {

	notifications: Notification[] = [];

	constructor() { }

	addNotification(notification: Notification) {
		this.notifications.push(notification);
	}

	deleteNotification(idx: number) {
		this.notifications.splice(idx, 1);
	}
}
