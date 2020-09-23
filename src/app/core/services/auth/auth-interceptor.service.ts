import { Injectable } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenStorageService} from "../token-storage/token-storage.service";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor(
    private tokenStorage: TokenStorageService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenStorage.getToken();
    let authRequest = req;
    if (token) {
      authRequest = req.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, `Bearer ${token}`)
      });
    }

    return next.handle(authRequest);
  }

}

export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
];
