import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '@app/services/token.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const tokenService = inject(TokenService);

  if (tokenService.isLogged()) {
    return true;
  } else {
    router.navigateByUrl("/auth");
    return false;
  }

};
