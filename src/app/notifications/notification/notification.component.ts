import { Component, Input, OnInit } from '@angular/core';
import { Notification, NotifierService } from 'src/app/services/notifier.service';

@Component({
	selector: 'app-notification',
	templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnInit {

	@Input() notification: Notification = {
		warning: true,
		title: "",
		message: ""
	};

	@Input() index = 0;

	constructor(
		private notifierService: NotifierService
	) { }

	ngOnInit(): void {
	}

	remove() {
		this.notifierService.deleteNotification(this.index);
	}

}
