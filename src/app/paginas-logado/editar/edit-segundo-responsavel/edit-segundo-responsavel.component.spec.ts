import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSegundoResponsavelComponent } from './edit-segundo-responsavel.component';

describe('EditSegundoResponsavelComponent', () => {
  let component: EditSegundoResponsavelComponent;
  let fixture: ComponentFixture<EditSegundoResponsavelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSegundoResponsavelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSegundoResponsavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
