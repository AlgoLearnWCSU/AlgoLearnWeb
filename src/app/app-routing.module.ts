import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BubbleSortComponent } from './learn/bubble-sort/bubble-sort.component';
import { LearnComponent } from './learn/learn.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProblemFormComponent } from './problem/problem-form/problem-form.component';
import { ProblemListComponent } from './problem/problem-list/problem-list.component';
import { ProblemComponent } from './problem/problem/problem.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'problem', component: ProblemListComponent },
	{ path: 'problem/solve/:id', component: ProblemComponent },
	{ path: 'problem/new', component: ProblemFormComponent },
	{ path: 'problem/edit/:id', component: ProblemFormComponent },
	{ path: 'learn', component: LearnComponent },
	{ path: 'learn/bubble-sort', component: BubbleSortComponent },
	{ path: '**', component: NotFoundComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
