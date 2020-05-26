import { KeysLocalStorage } from './../config/config';
import { swal } from './../extensions/swal';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { format } from 'url';
import { Usuario } from '../models/usuario.model';
import { routerNgProbeToken } from '@angular/router/src/router_module';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  recuerdame: boolean;
  email: string;

  auth2: any;

  constructor(private _router: Router, private _usuarioService: UsuarioService) {}

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem(KeysLocalStorage.Usuario.email) || '';
    this.recuerdame = this.email.length > 0;
  }

  /**
   * Método que sirve para inicializar auth2 (Google)
   */
  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '365925477594-vlrt0cr7mbejrfk3ni7tg9hm3scpsfd7.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email',
      });

      this.attachSignIn(document.getElementById('btnGoogle'));
    });
  }

  /**
   * Método que le agregará a un elemento en específico un Click Handler para disparar el login de google.
   * @param element El elemento HTML al que se le inyectará el Click Handler
   */
  attachSignIn(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // obtener datos de perfil
      // const profile = googleUser.getBasicProfile();

      // obtener token
      const token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle(token)
      .subscribe(x => {
        window.location.href = '#/dashboard';
      });

      console.log(token);
    });
  }

  ingresar(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const usuario = new Usuario(null, form.value.email, form.value.password);

    this._usuarioService.login(usuario, this.recuerdame).subscribe((x) => {
      this._router.navigate(['/dashboard']);
    });
  }
}
