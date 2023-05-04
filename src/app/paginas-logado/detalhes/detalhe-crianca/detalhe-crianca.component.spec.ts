import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheCriancaComponent } from './detalhe-crianca.component';

describe('DetalheCriancaComponent', () => {
  let component: DetalheCriancaComponent;
  let fixture: ComponentFixture<DetalheCriancaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalheCriancaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheCriancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
