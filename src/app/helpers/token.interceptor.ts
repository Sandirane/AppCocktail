import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiErrorService } from '@app/services/subjects/api-error.service';
import { TokenService } from '@app/services/token.service';
import { catchError, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const apiErrorService = inject(ApiErrorService);

  const loggedUser = tokenService.getToken();

  console.log("Initial Request:", req);
  console.log("Logged User Token:", loggedUser);

  if (loggedUser) {
    const clonedRequest = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${loggedUser}`)
    });
    console.log("Cloned Request with Authorization Header:", clonedRequest);

    return next(clonedRequest).pipe(
      catchError(error => {
        console.error("Request Error:", error);
        if (error.status === 401) {
          tokenService.clearToken();
        }

        apiErrorService?.sendError(error.message);

        return throwError('Session Expired');
      })
    );
  }

  return next(req);
};
