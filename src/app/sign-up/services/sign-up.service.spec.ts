import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {getTestBed, TestBed} from '@angular/core/testing';

import {SignUpService} from './sign-up.service';

describe('SignUpService', () => {
  let injector: TestBed;
  let service: SignUpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SignUpService]
    });
    service = TestBed.inject(SignUpService);
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call api', () => {
    service.signUp({
      firstName: 'hello',
      lastName: 'there',
      email: 'hello@there.com'
    })
      .subscribe((res) => {
        expect(res).toEqual({
          id: '1',
          firstName: 'hello',
          lastName: 'there',
          email: 'hello@there.com'
        });
      });

    const req = httpMock.expectOne(`/api/users`);

    expect(req.request.method).toBe('POST');

    req.flush({
      id: '1',
      firstName: 'hello',
      lastName: 'there',
      email: 'hello@there.com'
    });
  });
});
