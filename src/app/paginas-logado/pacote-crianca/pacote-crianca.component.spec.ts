import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacoteCriancaComponent } from './pacote-crianca.component';

describe('PacoteCriancaComponent', () => {
  let component: PacoteCriancaComponent;
  let fixture: ComponentFixture<PacoteCriancaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacoteCriancaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacoteCriancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
