import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarCriancaComponent } from './visualizar-crianca.component';

describe('VisualizarCriancaComponent', () => {
  let component: VisualizarCriancaComponent;
  let fixture: ComponentFixture<VisualizarCriancaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarCriancaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarCriancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
