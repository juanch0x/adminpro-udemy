import { ArchivoService } from './../archivo/archivo.service';
import { SwalOptions, swalInLine } from './../../extensions/swal';
import { Usuario } from './../../models/usuario.model';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS, KeysLocalStorage } from './../../config/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { swal } from '../../extensions/swal';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsuarioService {
  constructor(private http: HttpClient, private _ArchivoService: ArchivoService) {
    this.loadLocalStorage();
  }

  usuario: Usuario;
  token: string;

  public get IsLoggedIn(): boolean {
    return this.token != null && this.token.length > 5;
  }

  /**
   * login
   */
  public login(usuario: Usuario, recuerdame: boolean = false) {
    if (recuerdame) {
      localStorage.setItem(KeysLocalStorage.Usuario.email, usuario.email);
    } else {
      localStorage.removeItem(KeysLocalStorage.Usuario.email);
    }

    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).pipe(
      map((x: any) => {
        // Guardo en localStorage
        const usuario = <Usuario>x.usuario;
        this.saveInLocalStorage(usuario._id, x.token, usuario);
        return true;
      })
    );
  }

  /**
   * crearUsuario
   */
  public crearUsuario(usuario: Usuario): Observable<Usuario> {
    const url = URL_SERVICIOS + '/usuarios';
    return this.http.post<Usuario>(url, usuario).pipe(
      map((x: any) => {
        const usuario = <Usuario>x.usuario;
        swal({
          title: '¡Perfecto!',
          text: `El usuario ${usuario.email} se creó correctamente!`,
          icon: 'success'
        });
        return usuario;
      })
    );
  }

  public actualizarUsuario(usuario: Usuario): Observable<Usuario> {
    const url = URL_SERVICIOS + '/usuarios/' + this.usuario._id + '?token=' + this.token;
    return this.http.put(url, usuario).pipe(
      map((x: any) => {
        const usuario = <Usuario>x.usuario;
        this.saveInLocalStorage(usuario._id, this.token, usuario);
        const swalOptions: SwalOptions = {
          text: `El usuario ${usuario.nombre} fué modificado correctamente.`,
          title: 'Éxito',
          icon: 'success'
        };
        swal(swalOptions);

        return usuario;
      })
    );
  }

  /**
   * Método para cmabiar la imagen de un usuario.
   * @param file Nueva imagen para el usuario
   * @param id Id del usuario
   */
  public cambiarImagen(file: File, id: string) {
    this._ArchivoService
      .subirArchivo(file, 'usuarios', id)
      .then((x:any) => {
        const usuario = <Usuario>x.usuario;
        this.usuario.img = usuario.img;
        swalInLine('Imagen actualizada', this.usuario.nombre, 'info');
        this.saveInLocalStorage(this.usuario._id,this.token, this.usuario);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  public logOut(): void {
    localStorage.removeItem(KeysLocalStorage.Usuario.token);
    localStorage.removeItem(KeysLocalStorage.Usuario.user);
    localStorage.removeItem(KeysLocalStorage.Usuario.id);
    // refresco la página.
    window.location.reload();
  }

  public loginGoogle(token: string): Observable<any> {
    const url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, { token: token }).pipe(
      map((x: any) => {
        const usuario = <Usuario>x.usuario;
        this.saveInLocalStorage(usuario._id, x.token, usuario);
        return true;
      })
    );
  }

  /**
   * Método para guardar los datos del usuario en el LocalStorage.
   * @param id Id del usuario a guardar
   * @param token Token para validar la sesión del usuario
   * @param usuario Datos generales del usuario
   */
  private saveInLocalStorage(id: string, token: string, usuario: Usuario): void {
    localStorage.setItem(KeysLocalStorage.Usuario.id, usuario._id);
    localStorage.setItem(KeysLocalStorage.Usuario.token, token);
    localStorage.setItem(KeysLocalStorage.Usuario.user, JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  /**
   * Método para cargar los datos del usuario (si está logueado) desde el localStorage
   */
  private loadLocalStorage() {
    if (localStorage.getItem(KeysLocalStorage.Usuario.token)) {
      this.token = localStorage.getItem(KeysLocalStorage.Usuario.token);
      this.usuario = JSON.parse(localStorage.getItem(KeysLocalStorage.Usuario.user));
    } else {
      this.token = null;
      this.usuario = null;
    }
  }
}
