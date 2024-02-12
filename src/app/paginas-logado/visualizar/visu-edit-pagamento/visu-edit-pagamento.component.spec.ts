import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisuEditPagamentoComponent } from './visu-edit-pagamento.component';

describe('VisuEditPagamentoComponent', () => {
  let component: VisuEditPagamentoComponent;
  let fixture: ComponentFixture<VisuEditPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisuEditPagamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisuEditPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
