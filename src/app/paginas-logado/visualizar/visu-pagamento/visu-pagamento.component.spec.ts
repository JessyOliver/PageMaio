import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisuPagamentoComponent } from './visu-pagamento.component';

describe('VisuPagamentoComponent', () => {
  let component: VisuPagamentoComponent;
  let fixture: ComponentFixture<VisuPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisuPagamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisuPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
