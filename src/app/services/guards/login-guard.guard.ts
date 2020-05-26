import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {
  constructor(private _usuarioService: UsuarioService, private _router: Router) {}

  canActivate(): boolean {
    if (this._usuarioService.IsLoggedIn) {
      console.log('El usuario está logueado y tiene permiso de acceso.');
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
