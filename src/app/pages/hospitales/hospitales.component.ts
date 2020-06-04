import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';
import { Hospital } from './../../models/hospital.model';
import { HospitalService } from './../../services/hospital/hospital.service';
import { Component, OnInit } from '@angular/core';
import { swalInLine, swal } from '../../extensions/swal';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[];
  get total(): number {
    return this._hospitalService.total || 0;
  }

  desde: number = 0;

  filtered: boolean = false;

  constructor(private _hospitalService: HospitalService, public _modalUploadService: ModalUploadService) {}

  ngOnInit() {
    this.cargarHospitales();
  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales(this.desde).subscribe((x) => {
      this.hospitales = x;
    });
  }

  filterChanged(term: string) {
    if (term == null || term.length < 3) {
      if (this.filtered) {
        this.cargarHospitales();
        this.filtered = false;
      }
      return;
    }

    this._hospitalService.buscarHospital(term).subscribe((x) => {
      this.hospitales = x;
      this.filtered = true;
    });
  }

  guardarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital).subscribe(() => {
      swalInLine('Actualizado correctamente.', 'El hospital se actualizó correctamente.', 'success');
    });
  }

  cambiarImagen(id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
    this._modalUploadService.notificacion.subscribe((x) => {
      const hospitalGuardado = <Hospital>x.hospital;
      this.hospitales.find((x) => x._id === hospitalGuardado._id).img = hospitalGuardado.img;
    });
  }

  borrarHospital(id: string) {
    this._hospitalService.borrarHospital(id).subscribe(() => {
      this.cargarHospitales();
      swalInLine('¡Éxito!', 'El hospital fué eliminado correctamente', 'info');
    });
  }

  cambiarPagina(cantidad) {
    const nuevoDesde = cantidad + this.desde;
    if (nuevoDesde > 0 || nuevoDesde < this.total) {
      this.desde = nuevoDesde;
      this.cargarHospitales();
    }
  }

  agregarHospital() {
    swal({
      title: 'Nuevo hospital',
      text: 'Ingrese el nombre del hospital',
      icon: 'info',
      buttons: true,
      content: 'input',
      dangerMode: true
    }).then((value: string) => {
      if (value && value.length > 3) {
        this._hospitalService.crearHospital(value).subscribe(() => {
          swalInLine('¡Hospital creado correctamente!', `¡El hospital ${value} ya fue agregado!`, 'info');
        });
      }
    });
  }
}
