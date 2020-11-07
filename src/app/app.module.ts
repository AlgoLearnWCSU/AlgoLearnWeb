import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

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
		BubbleSortComponent
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
		MatExpansionModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
