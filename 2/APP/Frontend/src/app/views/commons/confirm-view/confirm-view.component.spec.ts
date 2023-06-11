import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmViewComponent } from './confirm-view.component';

describe('ConfirmViewComponent', () => {
  let component: ConfirmViewComponent;
  let fixture: ComponentFixture<ConfirmViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmViewComponent]
    });
    fixture = TestBed.createComponent(ConfirmViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
