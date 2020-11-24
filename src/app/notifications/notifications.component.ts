import { Component } from '@angular/core';
import { NotifierService } from '../services/notifier.service';

@Component({
	selector: 'app-notifications',
	templateUrl: './notifications.component.html'
})
export class NotificationsComponent {

	constructor(
		public notifierService: NotifierService
	) { }

}
