import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheSegundoResponsavelComponent } from './detalhe-segundo-responsavel.component';

describe('DetalheSegundoResponsavelComponent', () => {
  let component: DetalheSegundoResponsavelComponent;
  let fixture: ComponentFixture<DetalheSegundoResponsavelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalheSegundoResponsavelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheSegundoResponsavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
