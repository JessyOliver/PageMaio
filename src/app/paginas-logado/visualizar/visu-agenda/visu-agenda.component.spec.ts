import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisuAgendaComponent } from './visu-agenda.component';

describe('VisuAgendaComponent', () => {
  let component: VisuAgendaComponent;
  let fixture: ComponentFixture<VisuAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisuAgendaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisuAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
