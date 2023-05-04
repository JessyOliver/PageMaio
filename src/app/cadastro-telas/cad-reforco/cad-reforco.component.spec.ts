import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadReforcoComponent } from './cad-reforco.component';

describe('CadReforcoComponent', () => {
  let component: CadReforcoComponent;
  let fixture: ComponentFixture<CadReforcoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadReforcoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadReforcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
