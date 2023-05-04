import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarPacoteComponent } from './visualizar-pacote.component';

describe('VisualizarPacoteComponent', () => {
  let component: VisualizarPacoteComponent;
  let fixture: ComponentFixture<VisualizarPacoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarPacoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarPacoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
