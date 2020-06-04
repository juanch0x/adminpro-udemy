import { SideBarMenu } from './../../models/SideBarMenu.model';
import { ArchivoService } from './../archivo/archivo.service';
import { SwalOptions, swalInLine } from './../../extensions/swal';
import { Usuario } from './../../models/usuario.model';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS, KeysLocalStorage } from './../../config/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { swal } from '../../extensions/swal';
// errors
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class UsuarioService {
  constructor(private http: HttpClient, private _ArchivoService: ArchivoService) {
    this.loadLocalStorage();
  }

  usuario: Usuario;
  token: string;
  menu: SideBarMenu[];

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
        const menu = <SideBarMenu[]>x.menu;
        this.saveInLocalStorage(usuario._id, x.token, usuario, menu);
        return true;
      })
    ).catch(err => {
      if(err.status === 400){
        return Observable.throw(err.error.mensaje);
      }
      return Observable.throw(err);
    })
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

  /**
   * Método para actualizar el usuario actual.
   * @param usuario NUevos datos a actualizar.
   */
  public actualizarUsuario(usuario: Usuario): Observable<Usuario> {
    const url = URL_SERVICIOS + '/usuarios/' + this.usuario._id + '?token=' + this.token;
    return this.http.put(url, usuario).pipe(
      map((x: any) => {
        const usuario = <Usuario>x.usuario;
        this.saveInLocalStorage(usuario._id, this.token, usuario, this.menu);
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
   * Método para actualizar un usuario existente.
   * @param usuario NUevos datos a actualizar.
   */
  public actualizarUsuarioByAdmin(usuario: Usuario): Observable<Usuario> {
    const url = URL_SERVICIOS + '/usuarios/' + usuario._id + '?token=' + this.token;
    return this.http.put(url, usuario).pipe(
      map((x: any) => {
        const usuario = <Usuario>x.usuario;
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
      .then((x: any) => {
        const usuario = <Usuario>x.usuario;
        this.usuario.img = usuario.img;
        swalInLine('Imagen actualizada', this.usuario.nombre, 'info');
        this.saveInLocalStorage(this.usuario._id, this.token, this.usuario, this.menu);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /**
   * Método para realizar Logout.
   */
  public logOut(): void {
    localStorage.removeItem(KeysLocalStorage.Usuario.token);
    localStorage.removeItem(KeysLocalStorage.Usuario.user);
    localStorage.removeItem(KeysLocalStorage.Usuario.id);
    // refresco la página.
    window.location.reload();
  }

  /**
   * Login/Registro vía google.
   * @param token Token proporcionado por el servicio de Google
   */
  public loginGoogle(token: string): Observable<any> {
    const url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, { token: token }).pipe(
      map((x: any) => {
        console.log(x);
        const usuario = <Usuario>x.usuario;
        const menu = <SideBarMenu[]>x.menu;
        console.log('menu', menu);
        this.saveInLocalStorage(usuario._id, x.token, usuario, menu);
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
  private saveInLocalStorage(id: string, token: string, usuario: Usuario, menu: SideBarMenu[]): void {
    localStorage.setItem(KeysLocalStorage.Usuario.id, usuario._id);
    localStorage.setItem(KeysLocalStorage.Usuario.token, token);
    localStorage.setItem(KeysLocalStorage.Usuario.user, JSON.stringify(usuario));
    localStorage.setItem(KeysLocalStorage.Usuario.menu, JSON.stringify(menu));
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  /**
   * Método para cargar los datos del usuario (si está logueado) desde el localStorage
   */
  private loadLocalStorage() {
    if (localStorage.getItem(KeysLocalStorage.Usuario.token)) {
      this.token = localStorage.getItem(KeysLocalStorage.Usuario.token);
      this.usuario = JSON.parse(localStorage.getItem(KeysLocalStorage.Usuario.user));
      this.menu = JSON.parse(localStorage.getItem(KeysLocalStorage.Usuario.menu));
    } else {
      this.token = null;
      this.usuario = null;
      this.menu = [];
    }
  }

  // ================= //

  cargarUsuarios(desde: number = 0): Observable<any> {
    const url = URL_SERVICIOS + '/usuarios?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuarios(term: string): Observable<Usuario[]> {
    const url = URL_SERVICIOS + '/busqueda/coleccion/usuario/' + term;
    return this.http.get(url).pipe(map((x: any) => <Usuario[]>x.usuarios));
  }

  borrarUsuario(id: string): Observable<any> {
    if (id === this.usuario._id) {
      return null;
    }

    const url = URL_SERVICIOS + '/usuarios/' + id + '?token=' + this.token;
    console.log(url);
    return this.http.delete(url).pipe(
      map((x: any) => {
        console.log(x);
        if (x.ok === true) {
          swalInLine('Usuario eliminado', 'el usuario fue eliminado correctamente', 'success');
          return true;
        }
        return false;
      })
    );
  }
}
