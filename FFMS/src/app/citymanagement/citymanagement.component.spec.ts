import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitymanagementComponent } from './citymanagement.component';

describe('CitymanagementComponent', () => {
  let component: CitymanagementComponent;
  let fixture: ComponentFixture<CitymanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitymanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitymanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
