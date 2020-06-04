import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../service.index';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private _usuarioService: UsuarioService, private _router: Router) {}
  canActivate() {
    if (this._usuarioService.usuario.role === 'ADMIN_ROLE') {
      return true;
    } else {
      console.warn('Usted no tiene permisos para ingresar a esta ruta.');
      this._router.navigate(['/dashboard']);
      return false;
    }
  }
}
