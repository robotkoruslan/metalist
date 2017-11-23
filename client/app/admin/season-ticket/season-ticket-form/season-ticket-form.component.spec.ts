import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonTicketFormComponent } from './season-ticket-form.component';

describe('SeasonTicketFormComponent', () => {
  let component: SeasonTicketFormComponent;
  let fixture: ComponentFixture<SeasonTicketFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonTicketFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonTicketFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
