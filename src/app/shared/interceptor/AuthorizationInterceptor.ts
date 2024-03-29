import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class AuthorizationInterceptor implements HttpInterceptor {
    
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
        const jwtToken = sessionStorage.getItem('token') || ''

        const authReq = req.clone({
            headers: req.headers.set('Authorization', jwtToken)
        })

        return next.handle(authReq)
    }
    
}