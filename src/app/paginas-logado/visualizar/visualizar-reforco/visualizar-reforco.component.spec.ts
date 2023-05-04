import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarReforcoComponent } from './visualizar-reforco.component';

describe('VisualizarReforcoComponent', () => {
  let component: VisualizarReforcoComponent;
  let fixture: ComponentFixture<VisualizarReforcoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarReforcoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarReforcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
