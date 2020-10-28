import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHubComponent } from './user-hub.component';

describe('UserHubComponent', () => {
  let component: UserHubComponent;
  let fixture: ComponentFixture<UserHubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
