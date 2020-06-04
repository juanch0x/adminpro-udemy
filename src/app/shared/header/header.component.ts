import { Router } from '@angular/router';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { Usuario } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  usuario: Usuario;
  constructor(public _usuarioService: UsuarioService, private _router: Router) {}

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

  buscar(term: string) {
    if (term !== null && term.length > 3) {
      this._router.navigate(['/busqueda', term]);
    }
  }

  logOut() {
    this._usuarioService.logOut();
  }
}
