import { UsuarioService } from './../usuario/usuario.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Medico } from '../../models/medico.model';

@Injectable()
export class MedicoService {
  total: number;
  constructor(private http: HttpClient, private _usuarioService: UsuarioService) {}
  cargarMedicos(desde: number = 0): Observable<Medico[]> {
    const URL = URL_SERVICIOS + '/medico?desde=' + desde;
    return this.http.get(URL).pipe(
      map((x: any) => {
        this.total = x.total;
        return <Medico[]>x.medicos;
      })
    );
  }

  filtrarMedicos(term: string): Observable<Medico[]> {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medico/' + term;
    return this.http.get(url).pipe(map((x: any) => <Medico[]>x.medicos));
  }

  eliminarMedico(id: string): Observable<any> {
    const url = URL_SERVICIOS + '/medico/' + id + '?token=' + this._usuarioService.token;
    return this.http.delete(url);
  }

  guardarMedico(medico: Medico): Observable<Medico> {
    const url = URL_SERVICIOS + '/medico?token=' + this._usuarioService.token;
    return this.http.post(url, { nombre: medico.nombre, hospital: medico.hospital._id }).pipe(map((x: any) => <Medico>x.medico));
  }

  actualizarMedico(medico: Medico): Observable<Medico> {
    const url = URL_SERVICIOS + '/medico/' + medico._id + '?token=' + this._usuarioService.token;
    return this.http.put(url, { nombre: medico.nombre, hospital: medico.hospital._id }).pipe(map((x: any) => <Medico>x.medico));
  }

  findById(id: string): Observable<Medico> {
    const url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url).pipe(map((x: any) => <Medico>x.medico));
  }
}
