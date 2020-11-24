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

	private _notifications: Notification[] = [];

	constructor() { }

	get notifications() {
		return this._notifications;
	}

	addNotification(notification: Notification) {
		this._notifications.push(notification);
	}

	deleteNotification(idx: number) {
		this._notifications.splice(idx, 1);
	}
}
