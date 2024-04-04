import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  
  const authService = inject(AuthService);
  
  if (authService.secret) {
    const clone = req.clone({
      headers: req.headers.set("Authorization", 'Bearer '+authService.secret)   
    });
    return next(clone);
  }

  return next(req);
  
};
