import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisuEditResponsavelComponent } from './visu-edit-responsavel.component';

describe('VisuEditResponsavelComponent', () => {
  let component: VisuEditResponsavelComponent;
  let fixture: ComponentFixture<VisuEditResponsavelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisuEditResponsavelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisuEditResponsavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
