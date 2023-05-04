import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPacoteComponent } from './edit-pacote.component';

describe('EditPacoteComponent', () => {
  let component: EditPacoteComponent;
  let fixture: ComponentFixture<EditPacoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPacoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPacoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
