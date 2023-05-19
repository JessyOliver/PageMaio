import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisuSegundoresponsavelResponsavelComponent } from './visu-segundoresponsavel-responsavel.component';

describe('VisuSegundoresponsavelResponsavelComponent', () => {
  let component: VisuSegundoresponsavelResponsavelComponent;
  let fixture: ComponentFixture<VisuSegundoresponsavelResponsavelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisuSegundoresponsavelResponsavelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisuSegundoresponsavelResponsavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
