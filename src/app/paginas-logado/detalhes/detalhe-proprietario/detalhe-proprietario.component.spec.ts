import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheProprietarioComponent } from './detalhe-proprietario.component';

describe('DetalheProprietarioComponent', () => {
  let component: DetalheProprietarioComponent;
  let fixture: ComponentFixture<DetalheProprietarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalheProprietarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheProprietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
