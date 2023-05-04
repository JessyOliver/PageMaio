import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisuEditReforcoComponent } from './visu-edit-reforco.component';

describe('VisuEditReforcoComponent', () => {
  let component: VisuEditReforcoComponent;
  let fixture: ComponentFixture<VisuEditReforcoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisuEditReforcoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisuEditReforcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
