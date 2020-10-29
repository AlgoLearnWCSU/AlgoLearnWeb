import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProblemComponent } from './problem/problem/problem.component';
import { ProblemListComponent } from './problem/problem-list/problem-list.component';
import { ProblemFormComponent } from './problem/problem-form/problem-form.component';
import { UserHubComponent } from './user-hub/user-hub.component';


@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		HomeComponent,
		ProblemComponent,
		ProblemListComponent,
		ProblemFormComponent,
		UserHubComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgbModule,
		FormsModule,
		BrowserAnimationsModule,
		MatListModule,
		MatChipsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
