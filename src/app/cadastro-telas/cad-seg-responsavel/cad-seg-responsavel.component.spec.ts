import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadSegResponsavelComponent } from './cad-seg-responsavel.component';

describe('CadSegResponsavelComponent', () => {
  let component: CadSegResponsavelComponent;
  let fixture: ComponentFixture<CadSegResponsavelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadSegResponsavelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadSegResponsavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
