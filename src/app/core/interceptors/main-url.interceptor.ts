import { HttpInterceptorFn } from '@angular/common/http';

export const mainUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const newRequest = req.clone({
    url: `http://localhost:3000${req.url}`,
  });
  return next(newRequest);
};
