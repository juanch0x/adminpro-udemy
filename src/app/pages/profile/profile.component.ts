import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { swalInLine } from '../../extensions/swal';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imagenSubir: File;
  // Imagen que se mostrará a modo de vista previa de la nueva (antes de subirla.)
  imagenTemp: string | ArrayBuffer;

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

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    // valido que sea una imágen.
    if (archivo.type.indexOf('image') === -1) {
      swalInLine('¡Error', `El tipo de archivo ${archivo.type} no es soportado.\n Sólo se aceptan imagenes.`, 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }
}
