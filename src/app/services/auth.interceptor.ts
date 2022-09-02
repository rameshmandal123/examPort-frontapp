import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {LoginService} from "./login.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private loginService: LoginService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//Add the Jwt Token (localstorage) request.........
let authReq = req;
     const token = this.loginService.getToken();
     console.log('Inside interceptor',token)
  if(token != null){
  authReq = authReq.clone({
    setHeaders:{ Authorization: `Bearer ${token}`},
  });
}
return next.handle(authReq);

  }
}

export const authInterceptorProviders=[
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
]
