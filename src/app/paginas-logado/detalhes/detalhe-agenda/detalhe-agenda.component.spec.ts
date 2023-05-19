import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheAgendaComponent } from './detalhe-agenda.component';

describe('DetalheAgendaComponent', () => {
  let component: DetalheAgendaComponent;
  let fixture: ComponentFixture<DetalheAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalheAgendaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
