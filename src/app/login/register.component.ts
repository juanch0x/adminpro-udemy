import { swal } from './../extensions/swal';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private _usuarioService: UsuarioService, public router: Router) {}

  ngOnInit() {
    init_plugins();

    // Inicializo el formulario
    this.form = new FormGroup(
      {
        nombre: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        password2: new FormControl(null, Validators.required),
        condiciones: new FormControl(false),
      },
      { validators: this.sonIguales('password', 'password2') }
    );

    this.form.setValue({
      nombre: 'Juan',
      email: 'jportugal1992@gmail.com',
      password: '123456',
      password2: '123456',
      condiciones: false,
    });
  }
  /**
   * Método que se dispara al enviar el formulario
   */
  registrarUsuario() {
    if (this.form.invalid) {
      return;
    }
    if (this.form.value.condiciones !== true) {
      swal({
        title: 'Advertencia',
        text: 'Debe aceptar los términos y condiciones.',
        icon: 'warning',
      });
      return;
    }

    const usuario = new Usuario(this.form.value.nombre, this.form.value.email, this.form.value.password);

    this._usuarioService.crearUsuario(usuario).subscribe((x: Usuario) => {      
      this.router.navigate(['/login']);
    });
  }

  /**
   * Chequea si dos strings (campos de ReactiveForms) son iguales
   * @param campo1 Primer campo a comparar
   * @param campo2 Segundo campo a comparar
   */
  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      const pass = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;
      if (pass === pass2) {
        return null;
      }
      return {
        sonIguales: true,
      };
    };
  }
}
