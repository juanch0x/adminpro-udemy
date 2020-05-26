import { UsuarioService } from './../../services/usuario/usuario.service';
import { Usuario } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  usuario: Usuario;
  constructor(public _usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

  logOut() {
    this._usuarioService.logOut();
  }
}
