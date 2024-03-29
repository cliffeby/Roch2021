import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ResultsMatPrintComponent } from './results-mat-print.component';

describe('ResultsMatPrintComponent', () => {
  let component: ResultsMatPrintComponent;
  let fixture: ComponentFixture<ResultsMatPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultsMatPrintComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsMatPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
