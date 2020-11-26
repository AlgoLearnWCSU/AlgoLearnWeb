import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../services/logger.service'
import { NotifierService } from 'src/app/services/notifier.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

	message: string = '';
	loadingSubmit = false;

	constructor(
		private loggerService: LoggerService,
		private router: Router,
		private notifierService: NotifierService
	) {
	}

	ngOnInit(): void {
	}

	logContactUs() {
		this.loggerService.logContactUs(this.message).subscribe(() => {
			this.loadingSubmit = false;
			this.notifierService.addNotification({
				warning: false,
				title: 'Success',
				message: 'Thank you for your feedback!'
			});
		}, (err) => {
			this.loadingSubmit = false;
			this.notifierService.addNotification({
				warning: true,
				title: 'Error Submitting Message',
				message: err && err.message ? err.message : err.toString()
			});
		});
		this.router.navigate(['home']);
	}

	handleError(err) {

	}

	handleSuccess() {

	}
}
