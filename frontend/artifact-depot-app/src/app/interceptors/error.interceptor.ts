import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { TokenApiModel } from '../components/models/token-api.model';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const handleUnAuthorizedError = (req: HttpRequest<any>): Observable<HttpEvent<any>> => {
    const tokenApiModel = new TokenApiModel();
    tokenApiModel.accessToken = authService.getToken()!;
    tokenApiModel.refreshToken = authService.getRefreshToken()!;

    return authService.renewToken(tokenApiModel).pipe(
      switchMap((data: TokenApiModel) => {
        authService.storeToken(data.accessToken);
        authService.storeRefreshToken(data.refreshToken);

        const clonedReq = req.clone({
          setHeaders: { Authorization: `Bearer ${data.accessToken}` }
        });

        return next(clonedReq); 
      }),
      catchError(() => {
      alert("Token is expired, please login again");
        router.navigate(['login']);
        return throwError(() => new Error('Unauthorized'));
      })
    );
  };

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        return handleUnAuthorizedError(req); 
      }
      return throwError(() => err);
    })
  );
};