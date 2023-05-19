import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisuMensagensComponent } from './visu-mensagens.component';

describe('VisuMensagensComponent', () => {
  let component: VisuMensagensComponent;
  let fixture: ComponentFixture<VisuMensagensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisuMensagensComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisuMensagensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
