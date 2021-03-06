import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoresMatCenterComponent } from './scores-mat-center.component';

describe('ScoresMatCenterComponent', () => {
  let component: ScoresMatCenterComponent;
  let fixture: ComponentFixture<ScoresMatCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoresMatCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoresMatCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
