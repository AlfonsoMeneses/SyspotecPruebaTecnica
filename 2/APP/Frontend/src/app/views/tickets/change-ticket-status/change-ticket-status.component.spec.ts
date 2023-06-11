import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTicketStatusComponent } from './change-ticket-status.component';

describe('ChangeTicketStatusComponent', () => {
  let component: ChangeTicketStatusComponent;
  let fixture: ComponentFixture<ChangeTicketStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeTicketStatusComponent]
    });
    fixture = TestBed.createComponent(ChangeTicketStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
