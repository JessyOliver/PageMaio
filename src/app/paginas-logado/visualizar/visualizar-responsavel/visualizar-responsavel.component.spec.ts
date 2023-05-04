import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarResponsavelComponent } from './visualizar-responsavel.component';

describe('VisualizarResponsavelComponent', () => {
  let component: VisualizarResponsavelComponent;
  let fixture: ComponentFixture<VisualizarResponsavelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarResponsavelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarResponsavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
