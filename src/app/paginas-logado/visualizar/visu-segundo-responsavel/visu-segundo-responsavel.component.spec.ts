import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisuSegundoResponsavelComponent } from './visu-segundo-responsavel.component';

describe('VisuSegundoResponsavelComponent', () => {
  let component: VisuSegundoResponsavelComponent;
  let fixture: ComponentFixture<VisuSegundoResponsavelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisuSegundoResponsavelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisuSegundoResponsavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
