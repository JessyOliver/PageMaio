import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadAgendaComponent } from './cad-agenda.component';

describe('CadAgendaComponent', () => {
  let component: CadAgendaComponent;
  let fixture: ComponentFixture<CadAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadAgendaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
