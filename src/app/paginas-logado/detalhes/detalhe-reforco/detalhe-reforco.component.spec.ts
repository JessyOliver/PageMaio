import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheReforcoComponent } from './detalhe-reforco.component';

describe('DetalheReforcoComponent', () => {
  let component: DetalheReforcoComponent;
  let fixture: ComponentFixture<DetalheReforcoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalheReforcoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheReforcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
