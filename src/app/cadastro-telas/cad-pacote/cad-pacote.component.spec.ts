import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadPacoteComponent } from './cad-pacote.component';

describe('CadPacoteComponent', () => {
  let component: CadPacoteComponent;
  let fixture: ComponentFixture<CadPacoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadPacoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadPacoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
