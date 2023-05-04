import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResponsavelComponent } from './edit-responsavel.component';

describe('EditResponsavelComponent', () => {
  let component: EditResponsavelComponent;
  let fixture: ComponentFixture<EditResponsavelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditResponsavelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditResponsavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
