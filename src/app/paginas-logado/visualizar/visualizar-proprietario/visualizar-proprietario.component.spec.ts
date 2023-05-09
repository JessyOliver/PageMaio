import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarProprietarioComponent } from './visualizar-proprietario.component';

describe('VisualizarProprietarioComponent', () => {
  let component: VisualizarProprietarioComponent;
  let fixture: ComponentFixture<VisualizarProprietarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarProprietarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarProprietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
