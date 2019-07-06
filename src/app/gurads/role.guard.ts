import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements  CanActivate {
  path: ActivatedRouteSnapshot[];  route: ActivatedRouteSnapshot;
  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let user = JSON.parse(localStorage.getItem("_USER"))
    if (localStorage.getItem("_USER") && user.role == 1) {
      return true;
    }
    
    this.router.navigate(['login'], {queryParams: { next: state.url }});
    return false;
  }
}
