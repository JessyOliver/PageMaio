import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhePacoteComponent } from './detalhe-pacote.component';

describe('DetalhePacoteComponent', () => {
  let component: DetalhePacoteComponent;
  let fixture: ComponentFixture<DetalhePacoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhePacoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhePacoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
