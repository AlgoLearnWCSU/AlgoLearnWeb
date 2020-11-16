import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ProblemService, Comment } from '../../services/problem.service';
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';


@Component({
	selector: 'app-problem-discussion',
	templateUrl: './problem-discussion.component.html',
	styleUrls: ['./problem-discussion.component.scss']
})
export class ProblemDiscussionComponent implements OnInit {

	@Input() id: number;

	comments: Comment[];
	isEditingComments: boolean[] = [];
	newComment: Comment;

	pageState: PageEvent;

	usernameToAvatarMap = {};

	constructor(
		private problemService: ProblemService,
		public userService: UserService
	) {
		this.newComment = {
			id: null,
			commenter: this.userService.username,
			problem: this.id,
			comment: '',
			timestamp: null
		};
	}

	ngOnInit(): void {
		this.problemService.getCommentsByProblemId(this.id).subscribe(
			comments => {
				this.comments = comments;
				this.isEditingComments.fill(false, 0, comments.length - 1);

				this.pageState = {
					length: this.comments.length,
					pageIndex: 0,
					pageSize: 5,
					previousPageIndex: null
				};

				for (const comment of this.comments) {
					if (!this.usernameToAvatarMap[comment.commenter]) {
						this.userService.getUserByUsername(comment.commenter).subscribe(
							user => {
								if (user.avatar_url != null) {
									this.usernameToAvatarMap[comment.commenter] = user.avatar_url;
								}
								else {
									this.usernameToAvatarMap[comment.commenter] =
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

	submitComment(form: NgForm) {
		if (form.form.status === 'VALID') {
			if (!this.usernameToAvatarMap[this.userService.username]) {
				if (this.userService.avatar_url) {
					this.usernameToAvatarMap[this.userService.username] =
						this.userService.avatar_url;
				}
				else {
					this.usernameToAvatarMap[this.userService.username] =
						'https://icon-library.com/images/default-user-icon/default-user-icon-4.jpg';
				}
			}
			this.newComment.commenter = this.userService.username;
			this.newComment.problem = this.id;
			console.log('Trying to create comment: ', this.newComment);
			this.problemService.createComment(this.newComment).subscribe(
				res => {
					this.comments.push(res);
					form.reset();
					this.pageState.length = this.comments.length;
					this.pageState.pageIndex =
						Math.floor((this.pageState.length - 1) / this.pageState.pageSize);
					this.pageState.previousPageIndex = this.pageState.pageIndex - 1;
					this.updateCommentView(this.pageState);
				},
				err => console.error(err)
			);
		}
	}

	editComment(idx: number) {
		this.isEditingComments[idx] = true;
	}

	cancelEditComment(idx: number) {
		this.isEditingComments[idx] = false;
	}

	submitEditComment(form: NgForm, idx: number,
		commentTextarea: HTMLTextAreaElement) {
		if (form.form.status === 'VALID') {
			const newComment = this.comments[idx];
			newComment.comment = commentTextarea.value;
			this.problemService.editComment(this.comments[idx]).subscribe(
				res => {
					this.comments[idx] = res;
					this.isEditingComments[idx] = false;
				}
			);
		}
	}

	updateCommentView(event: PageEvent) {
		this.pageState = event;
	}

	deleteComment(idx: number) {
		this.problemService.deleteCommentByCommentId(this.comments[idx].id).subscribe(
			res => {
				console.log(idx);
				this.comments.splice(idx, 1);
				this.isEditingComments[idx] = false;
			},
			err => console.error(err)
		);
	}
}
