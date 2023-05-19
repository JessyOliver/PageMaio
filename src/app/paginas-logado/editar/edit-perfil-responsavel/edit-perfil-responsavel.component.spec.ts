import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPerfilResponsavelComponent } from './edit-perfil-responsavel.component';

describe('EditPerfilResponsavelComponent', () => {
  let component: EditPerfilResponsavelComponent;
  let fixture: ComponentFixture<EditPerfilResponsavelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPerfilResponsavelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPerfilResponsavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
