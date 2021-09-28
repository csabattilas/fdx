import {HttpClientModule} from '@angular/common/http';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MATERIAL_SANITY_CHECKS} from '@angular/material/core';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {of} from 'rxjs';
import {SignUpService} from '../../services/sign-up.service';

import {SignUpResultComponent} from './sign-up-result.component';


describe('SignUpResultComponent', () => {
  let component: SignUpResultComponent;
  let fixture: ComponentFixture<SignUpResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatProgressSpinnerModule,
        MatDialogModule
      ],
      declarations: [
        SignUpResultComponent
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: of({}),
        },
        {
          provide: MATERIAL_SANITY_CHECKS,
          useValue: false
        },
        SignUpService,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
