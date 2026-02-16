import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetDialogComponent } from './predmet-dialog.component';

describe('PredmetDialogComponent', () => {
  let component: PredmetDialogComponent;
  let fixture: ComponentFixture<PredmetDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PredmetDialogComponent]
    });
    fixture = TestBed.createComponent(PredmetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
