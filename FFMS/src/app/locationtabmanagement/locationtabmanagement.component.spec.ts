import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationtabmanagementComponent } from './locationtabmanagement.component';

describe('LocationtabmanagementComponent', () => {
  let component: LocationtabmanagementComponent;
  let fixture: ComponentFixture<LocationtabmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationtabmanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationtabmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
