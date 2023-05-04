import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadCriancaComponent } from './cad-crianca.component';

describe('CadCriancaComponent', () => {
  let component: CadCriancaComponent;
  let fixture: ComponentFixture<CadCriancaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadCriancaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadCriancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
