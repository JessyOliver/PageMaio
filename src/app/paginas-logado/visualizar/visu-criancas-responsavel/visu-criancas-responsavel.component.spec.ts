import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisuCriancasResponsavelComponent } from './visu-criancas-responsavel.component';

describe('VisuCriancasResponsavelComponent', () => {
  let component: VisuCriancasResponsavelComponent;
  let fixture: ComponentFixture<VisuCriancasResponsavelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisuCriancasResponsavelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisuCriancasResponsavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
