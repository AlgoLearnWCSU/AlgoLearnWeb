import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ProblemService, Comment } from '../../services/problem.service';

@Component({
	selector: 'app-problem-discussion',
	templateUrl: './problem-discussion.component.html',
	styleUrls: ['./problem-discussion.component.scss']
})
export class ProblemDiscussionComponent implements OnInit {

	@Input() id: number;

	comments: Comment[];
	usernameToAvatarMap = {};

	constructor(
		private problemService: ProblemService,
		public userService: UserService
	) { }

	ngOnInit(): void {
		this.problemService.getCommentsByProblemId(this.id).subscribe(
			comments => {
				this.comments = comments;
				for (const comment of this.comments) {
					if (!this.usernameToAvatarMap[comment.commenter]) {
						this.userService.getUserByUsername(comment.commenter).subscribe(
							user => {
								if (user.avatar_url != null) {
									this.usernameToAvatarMap[comment.commenter] = user.avatar_url;
								}
								else {
									this.usernameToAvatarMap[comment.commenter] = 'https://icon-library.com/images/default-user-icon/default-user-icon-4.jpg';
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
