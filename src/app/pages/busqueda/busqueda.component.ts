import { Hospital } from './../../models/hospital.model';
import { Usuario } from './../../models/usuario.model';
import { URL_SERVICIOS } from './../../config/config';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {
  constructor(private _routerActive: ActivatedRoute, private http: HttpClient, private router: Router) {}

  usuarios: Usuario[];
  get totalUsuarios() {
    return (this.usuarios && this.usuarios.length) || 0;
  }
  medicos: Medico[];
  get totalMedicos() {
    return (this.medicos && this.medicos.length) || 0;
  }
  hospitales: Hospital[];
  get totalHospitales() {
    return (this.hospitales && this.hospitales.length) || 0;
  }

  ngOnInit() {
    this._routerActive.params.subscribe((x) => this.buscar(x.termino));
  }

  buscar(termino: string) {
    const URL = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get(URL).subscribe((x: any) => {
      this.usuarios = x.usuarios;
      this.medicos = x.medicos;
      this.hospitales = x.hospitales;
      console.log(this.usuarios, this.medicos, this.hospitales);
    });
  }
}
