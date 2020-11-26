import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ProblemService } from 'src/app/services/problem.service';
import { Solution, Result, SolutionService } from '../../services/solution.service';
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

@Component({
	selector: 'app-problem-leaderboard',
	templateUrl: './problem-leaderboard.component.html',
	styleUrls: ['./problem-leaderboard.component.scss']
})
export class ProblemLeaderboardComponent implements OnInit {

	@Input() id: number;

	solutions: Solution[];
	pageState: PageEvent;
	usernameToAvatarMap = {};

	constructor(private problemService: ProblemService, public userService: UserService) { }

	ngOnInit(): void {
		this.problemService.getSolutionsByProblemId(this.id).subscribe(
			solutions => {
				this.solutions = solutions;
				this.pageState = {
					length: this.solutions.length,
					pageIndex: 0,
					pageSize: 5,
					previousPageIndex: null
				};

				solutions.sort((a, b) => {
					if (a.passedTests === b.passedTests) {
						return a.avgCompTime - b.avgCompTime;
					}
					return a.passedTests - b.passedTests;
				});

				for (const solution of this.solutions) {
					if (!this.usernameToAvatarMap[solution.solver]) {
						this.userService.getUserByUsername(solution.solver).subscribe(
							user => {
								if (user.avatar_url != null) {
									this.usernameToAvatarMap[solution.solver] = user.avatar_url;
								}
								else {
									this.usernameToAvatarMap[solution.solver] =
										'https://icon-library.com/images/default-user-icon/default-user-icon-4.jpg';
								}
							},
							err => console.error(err)
						);
					}
				}
			},
			err => console.error(err)
		);
	}
}
