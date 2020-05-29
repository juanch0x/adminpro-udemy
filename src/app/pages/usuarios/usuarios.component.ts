import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { swalInLine, swal } from '../../extensions/swal';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Array<Usuario> = [];
  desde: number = 0;
  total: number = 0;
  cargando: boolean = true;
  filtered: boolean = false;

  constructor(private _usuarioService: UsuarioService, public _modalUploadService: ModalUploadService) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde).subscribe((x) => {
      this.total = x.total;
      this.usuarios = <Usuario[]>x.usuarios;
      this.cargando = false;
    });
  }

  cambiarDesde(valor: number): void {
    const newDesde = this.desde + valor;
    if (newDesde < 0 || newDesde > this.total) {
      return;
    }
    this.desde = newDesde;
    this.cargarUsuarios();
  }

  buscarUsuario(term: string) {
    if (!term) {
      this.cargarUsuarios();
      this.filtered = false;
      return;
    }
    this._usuarioService.buscarUsuarios(term).subscribe((x) => {
      this.usuarios = x;
      this.filtered = true;
    });
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuario._id) {
      swalInLine('¡Error!', 'El usuario actual no puede ser borrado', 'error');
      return;
    }

    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then((willDelete) => {
      if(willDelete){
        this._usuarioService.borrarUsuario(usuario._id).subscribe((x) => {
          this.cargarUsuarios();
        });
      }
    });
  }

  guardarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuarioByAdmin(usuario).subscribe(x => {
      console.log(x);
    });
  }

  mostrarModal(id: string){
    this._modalUploadService.mostrarModal('usuarios', id);
    this._modalUploadService.notificacion.subscribe(x => {
      const usuarioGuardado = <Usuario>x.usuario;
      this.usuarios.find(x => x._id === usuarioGuardado._id).img = usuarioGuardado.img;
    });
  }

}
