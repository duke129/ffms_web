import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupProfileComponent } from './user-group-profile.component';

describe('UserGroupProfileComponent', () => {
  let component: UserGroupProfileComponent;
  let fixture: ComponentFixture<UserGroupProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
