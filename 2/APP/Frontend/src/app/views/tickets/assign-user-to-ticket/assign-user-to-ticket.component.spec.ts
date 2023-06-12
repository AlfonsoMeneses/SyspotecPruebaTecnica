import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignUserToTicketComponent } from './assign-user-to-ticket.component';

describe('AssignUserToTicketComponent', () => {
  let component: AssignUserToTicketComponent;
  let fixture: ComponentFixture<AssignUserToTicketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignUserToTicketComponent]
    });
    fixture = TestBed.createComponent(AssignUserToTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
