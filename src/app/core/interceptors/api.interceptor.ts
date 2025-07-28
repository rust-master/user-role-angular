import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  // Get token from local storage
  const token = localStorage.getItem('token');

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Log POST requests
  if (authReq.method === 'POST') {
    console.log('[API POST]', authReq.urlWithParams, authReq.body);
  }

  if (authReq.method === 'DELETE') {
    console.log('[API DELETE]', authReq.urlWithParams, authReq.body);
  }

  if (authReq.method === 'PUT') {
    console.log('[API PUT]', authReq.urlWithParams, authReq.body);
  }

  if (authReq.method === 'PATCH') {
    console.log('[API PATCH]', authReq.urlWithParams, authReq.body);
  }

  return next(authReq);
};
