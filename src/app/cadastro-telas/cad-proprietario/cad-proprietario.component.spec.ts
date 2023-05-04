import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadProprietarioComponent } from './cad-proprietario.component';

describe('CadProprietarioComponent', () => {
  let component: CadProprietarioComponent;
  let fixture: ComponentFixture<CadProprietarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadProprietarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadProprietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
