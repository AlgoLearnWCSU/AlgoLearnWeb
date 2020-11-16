import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemDiscussionPageComponent } from './problem-discussion-page.component';

describe('ProblemDiscussionPageComponent', () => {
  let component: ProblemDiscussionPageComponent;
  let fixture: ComponentFixture<ProblemDiscussionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemDiscussionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemDiscussionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
