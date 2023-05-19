import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProprietarioUnicComponent } from './edit-proprietario-unic.component';

describe('EditProprietarioUnicComponent', () => {
  let component: EditProprietarioUnicComponent;
  let fixture: ComponentFixture<EditProprietarioUnicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProprietarioUnicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProprietarioUnicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
