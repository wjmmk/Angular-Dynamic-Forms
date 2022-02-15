import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { 
        HttpEvent,  
        HttpHandler, 
        HttpRequest, 
        HttpErrorResponse
       } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TokenStoreService } from './token-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  private token = '';
  handleError: any;
  constructor(private router: Router, private tokenStore: TokenStoreService) {
    this.tokenStore.select$()
      .subscribe(token => (this.token = token));
  }


  /* public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(this.handleError.bind(this)));
  }
  private handleError(err) {
    const unauthorized_code = 401;
    if (err instanceof HttpErrorResponse) {
      if (err.status === unauthorized_code) {
        this.router.navigate(['security/register']);
      }
    }
    return throwError(err);
  } */

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authHeader = { Authorization: 'bearer ' + this.token };
    const authReq = req.clone({ setHeaders: authHeader });
    return next.handle(authReq)
      .pipe(catchError(this.handleError.bind(this)));
  }

}
function catchError(arg0: any): import("rxjs").OperatorFunction<HttpEvent<any>, HttpEvent<any>> {
  throw new Error('Function not implemented.');
}

