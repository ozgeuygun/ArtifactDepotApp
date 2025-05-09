import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { TokenApiModel } from '../components/models/token-api.model';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService); 
  const router = inject(Router);  

  const myToken = authService.getToken();
  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${myToken}`
    }
  });

  return next(newReq).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
        //  alert('Session expired or unauthorized. Please log in again.');
        return handleUnAuthorizedError(req, next, authService, router);
        // router.navigate(['login']);
      
        }
      }
      return throwError(() => err);
    })
  );
};

function handleUnAuthorizedError(
  req: HttpRequest<any>,
  next: (req: HttpRequest<any>) => Observable<HttpEvent<any>>,
  authService: AuthService,
  router: Router
): Observable<HttpEvent<any>> {
  const tokenApiModel = new TokenApiModel();
  tokenApiModel.accessToken = authService.getToken()!;
  tokenApiModel.refreshToken = authService.getRefreshToken()!;

  return authService.renewToken(tokenApiModel).pipe(
    switchMap((data: TokenApiModel) => {
      authService.storeToken(data.accessToken);
      authService.storeRefreshToken(data.refreshToken);

      const clonedReq = req.clone({
      setHeaders: { Authorization: `Bearer ${data.accessToken}` },
      });

      return next(clonedReq);
    }),
    catchError(() => {
      alert('Token is expired, please login again');
      router.navigate(['login']);
      return throwError(() => new Error('Unauthorized'));
    })
  );
}
