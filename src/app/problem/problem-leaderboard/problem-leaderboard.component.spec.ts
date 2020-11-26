import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemLeaderboardComponent } from './problem-leaderboard.component';

describe('ProblemLeaderboardComponent', () => {
	let component: ProblemLeaderboardComponent;
	let fixture: ComponentFixture<ProblemLeaderboardComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ProblemLeaderboardComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProblemLeaderboardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
