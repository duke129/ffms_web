import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchmanagementComponent } from './branchmanagement.component';

describe('BranchmanagementComponent', () => {
  let component: BranchmanagementComponent;
  let fixture: ComponentFixture<BranchmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchmanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
