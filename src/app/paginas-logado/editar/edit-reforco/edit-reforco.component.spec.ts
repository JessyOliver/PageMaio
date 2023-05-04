import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReforcoComponent } from './edit-reforco.component';

describe('EditReforcoComponent', () => {
  let component: EditReforcoComponent;
  let fixture: ComponentFixture<EditReforcoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReforcoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditReforcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
