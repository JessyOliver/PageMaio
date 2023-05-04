import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProprietarioComponent } from './edit-proprietario.component';

describe('EditProprietarioComponent', () => {
  let component: EditProprietarioComponent;
  let fixture: ComponentFixture<EditProprietarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProprietarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProprietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
