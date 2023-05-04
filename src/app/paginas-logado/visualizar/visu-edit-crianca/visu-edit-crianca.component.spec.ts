import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisuEditCriancaComponent } from './visu-edit-crianca.component';

describe('VisuEditCriancaComponent', () => {
  let component: VisuEditCriancaComponent;
  let fixture: ComponentFixture<VisuEditCriancaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisuEditCriancaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisuEditCriancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
