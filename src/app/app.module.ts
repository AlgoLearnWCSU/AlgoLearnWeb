import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProblemComponent } from './problem/problem/problem.component';
import { ProblemListComponent } from './problem/problem-list/problem-list.component';
import { ProblemFormComponent } from './problem/problem-form/problem-form.component';
import { UserHubComponent } from './user-hub/user-hub.component';
import { LearnComponent } from './learn/learn.component';
import { BubbleSortComponent } from './learn/bubble-sort/bubble-sort.component';
import { MergeSortComponent } from './learn/merge-sort/merge-sort.component';
import { InsertionSortComponent } from './learn/insertion-sort/insertion-sort.component';
import { QuickSortComponent } from './learn/quick-sort/quick-sort.component';
import { SelectionSortComponent } from './learn/selection-sort/selection-sort.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { ProblemDiscussionComponent } from './problem/problem-discussion/problem-discussion.component';
import { ProblemDiscussionPageComponent } from './problem/problem-discussion-page/problem-discussion-page.component';
import { Interceptor } from './interceptors/interceptor';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationComponent } from './notifications/notification/notification.component';
import { GlobalErrorHandler } from './error-handlers/global-error-handler';
import { ProblemLeaderboardComponent } from './problem/problem-leaderboard/problem-leaderboard.component';
import { ProblemLeaderboardPageComponent } from './problem/problem-leaderboard-page/problem-leaderboard-page.component';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		HomeComponent,
		ProblemComponent,
		ProblemListComponent,
		ProblemFormComponent,
		UserHubComponent,
		LearnComponent,
		BubbleSortComponent,
		MergeSortComponent,
		InsertionSortComponent,
		QuickSortComponent,
		SelectionSortComponent,
		CodeEditorComponent,
		ProblemDiscussionComponent,
		ProblemDiscussionPageComponent,
		NotificationsComponent,
		NotificationComponent,
		ProblemLeaderboardComponent,
		ProblemLeaderboardPageComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		NgbModule,
		FormsModule,
		BrowserAnimationsModule,
		MatListModule,
		MatChipsModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatExpansionModule,
		MatCardModule,
		MatPaginatorModule,
		MatProgressBarModule
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
		{ provide: ErrorHandler, useClass: GlobalErrorHandler },
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
