import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemLeaderboardPageComponent } from './problem-leaderboard-page.component';

describe('ProblemLeaderboardPageComponent', () => {
	let component: ProblemLeaderboardPageComponent;
	let fixture: ComponentFixture<ProblemLeaderboardPageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ProblemLeaderboardPageComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProblemLeaderboardPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
