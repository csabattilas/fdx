import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed, getTestBed} from '@angular/core/testing';

import {SignUpService} from './sign-up.service';

describe('SignUpService', () => {
  let injector: TestBed;
  let service: SignUpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
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
    }).subscribe((res) => {
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

  it('should push error message', () => {
    const mockErrorResponse = {status: 400, statusText: 'Bad Request'};
    const data = 'Invalid request parameters';

    jest.spyOn(service['errorMessageSubject'], 'next');

    service.signUp({
      firstName: 'hello',
      lastName: 'there',
      email: 'hello@there.com'
    }).subscribe();

    const req = httpMock.expectOne(`/api/users`)
    expect(req.request.method).toBe('POST');

    req.flush(data, mockErrorResponse);
    expect(service['errorMessageSubject'].next).toHaveBeenCalledWith('Something went wrong please try again later or check your internet connection.')
  })
});
