import { coerceNumberProperty } from '@angular/cdk/coercion';
import { ErrorHandler, Injectable } from '@angular/core';
import { LoggerService } from '../services/logger.service';
import { NotifierService } from '../services/notifier.service';
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
	constructor(
		private loggerService: LoggerService,
		private notifierService: NotifierService
	) { }

	handleError(error) {
		if (!error || error.alreadyThrown)
			return;
		this.notifierService.addNotification({
			warning: true,
			title: 'Error',
			message: 'An error has occured. A description of the error ' +
				'as been sent to the developement team to resolve the issue.' +
				' If the page is unresponsive, you can refresh the page to try again.'
		});
		this.loggerService.log('Error:\n```' + error.toString() + '```Stack:```' + error.stack + '```');
		error.alreadyThrown = true;
		throw error;
	}

}