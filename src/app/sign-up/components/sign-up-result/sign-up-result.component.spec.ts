import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http';
import {MATERIAL_SANITY_CHECKS} from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {SignUpResultComponent} from './sign-up-result.component';
import {SignUpService} from '../../services/sign-up.service';
import {of} from 'rxjs';

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
