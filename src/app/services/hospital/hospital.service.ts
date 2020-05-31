import { UsuarioService } from './../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { Hospital } from '../../models/hospital.model';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { identifierModuleUrl } from '@angular/compiler';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class HospitalService {
  total: number;
  constructor(private http: HttpClient, private _usuarioService: UsuarioService) {}

  cargarHospitales(desde: number = 0): Observable<Hospital[]> {
    const url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get(url).pipe(
      map((x: any) => {
        this.total = x.total;
        return <Hospital[]>x.hospitales;
      })
    );
  }

  buscarHOspital(id: string): Observable<Hospital> {
    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url).pipe(map((x: any) => <Hospital>x.hospital));
  }

  borrarHospital(id: string): Observable<any> {
    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this._usuarioService.token;
    return this.http.delete(url);
  }

  actualizarHospital(hospital: Hospital): Observable<Hospital> {
    const url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;
    return this.http.put(url, { nombre: hospital.nombre }).pipe(
      map((x: any) => {
        return <Hospital>x.hospital;
      })
    );
  }

  crearHospital(nombre: string): Observable<Hospital> {
    const url = URL_SERVICIOS + '/hospital?token=' + this._usuarioService.token;
    return this.http.post(url, { nombre }).pipe(map((x: any) => <Hospital>x.hospital));
  }

  buscarHospital(term: string): Observable<Hospital[]> {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospital/' + term;
    return this.http.get(url).pipe(map((x: any) => <Hospital[]>x.hospitales));
  }
}
