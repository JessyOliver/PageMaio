import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadResponsavelComponent } from './cad-responsavel.component';

describe('CadResponsavelComponent', () => {
  let component: CadResponsavelComponent;
  let fixture: ComponentFixture<CadResponsavelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadResponsavelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadResponsavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
