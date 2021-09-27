import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';

import {SignUpResultComponent} from './sign-up-result.component';

describe('SignUpResultComponent', () => {
  let component: SignUpResultComponent;
  let fixture: ComponentFixture<SignUpResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [SignUpResultComponent],
      providers: [{
        provide: MAT_DIALOG_DATA, useValue: {}
      }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
