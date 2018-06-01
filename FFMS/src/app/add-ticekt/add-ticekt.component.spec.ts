import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTicektComponent } from './add-ticekt.component';

describe('AddTicektComponent', () => {
  let component: AddTicektComponent;
  let fixture: ComponentFixture<AddTicektComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTicektComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTicektComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
