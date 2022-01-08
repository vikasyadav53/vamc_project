import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BackendServicesManagerService } from './backend-services-manager.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService {

  constructor(private backendServicesManagerService: BackendServicesManagerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.backendServicesManagerService.getToken();
    const isLoggedIn = token == null || token == undefined ? false : true;
    if (isLoggedIn ) {
        request = request.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
        });
    }

    return next.handle(request);
}
}
