import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditTicketComponent } from './create-or-edit-ticket.component';

describe('CreateOrEditTicketComponent', () => {
  let component: CreateOrEditTicketComponent;
  let fixture: ComponentFixture<CreateOrEditTicketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrEditTicketComponent]
    });
    fixture = TestBed.createComponent(CreateOrEditTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
