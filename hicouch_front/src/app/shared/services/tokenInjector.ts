import { Injectable, Inject, forwardRef } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {AuthenticationService} from './authentification.service';
import {Observable} from 'rxjs';

@Injectable()
export class TokenInjector implements HttpInterceptor {

    constructor(@Inject(forwardRef(() => AuthenticationService)) private auth: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.auth.accessToken}`
            }
        });

        return next.handle(request);
    }
}
