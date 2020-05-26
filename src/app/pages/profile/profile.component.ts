import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  constructor(private _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {}

  guardar(usuarioModificado: Usuario) {
    this.usuario.nombre = usuarioModificado.nombre;
    if (!this.usuario.google) {
      this.usuario.email = usuarioModificado.email;
    }
    this._usuarioService.actualizarUsuario(this.usuario).subscribe((x) => {});
  }
}
