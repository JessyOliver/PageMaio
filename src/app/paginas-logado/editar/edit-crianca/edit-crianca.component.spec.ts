import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCriancaComponent } from './edit-crianca.component';

describe('EditCriancaComponent', () => {
  let component: EditCriancaComponent;
  let fixture: ComponentFixture<EditCriancaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCriancaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCriancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
