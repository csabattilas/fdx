import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {SignUpRequest, SignUpResponse} from '../sign-up.model';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  private readonly signUpApiPath = '/api/users'; // this usually depends on env, but for this demo we can keep this simple

  private signUpSubject: Subject<SignUpResponse> = new Subject<SignUpResponse>();
  public signUp$ = this.signUpSubject.asObservable();

  private errorMessageSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public errorMessage$ = this.errorMessageSubject.asObservable();

  constructor(private readonly httpClient: HttpClient) {
  }

  public signUp(signUpRequest: SignUpRequest): Observable<SignUpResponse> {
    return this.httpClient.post<SignUpResponse>(this.signUpApiPath, signUpRequest)
      .pipe(
        map((response: SignUpResponse) => response as SignUpResponse),
        catchError((e) => {
          this.errorMessageSubject.next('Something went wrong please try again later or check your internet connection.');
          return throwError(new Error()); //not sending business error out
        })
      )
  }
}
