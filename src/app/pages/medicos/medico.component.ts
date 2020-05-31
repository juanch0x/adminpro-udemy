import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HospitalService } from './../../services/hospital/hospital.service';
import { MedicoService } from './../../services/medico/medico.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { swalInLine } from '../../extensions/swal';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[];
  medico: Medico = new Medico();

  get selectedHospital(): Hospital {
    return (this.hospitales && this.hospitales.find((x) => x._id === this.medico.hospital._id)) || new Hospital('');
  }

  constructor(private _medicoService: MedicoService, private _hospitalService: HospitalService, private _router: Router, private _activatedRoute: ActivatedRoute, private _modalUploadService: ModalUploadService) {}

  ngOnInit() {
    this._activatedRoute.params.subscribe((x) => {
      const id = x.id;
      if (id) {
        this._medicoService.findById(x.id).subscribe((x) => (this.medico = x));
      }
    });

    this._hospitalService.cargarHospitales().subscribe((x) => (this.hospitales = x));
  }

  cambiarFoto() {
    this._modalUploadService.mostrarModal('medicos', this.medico._id);
    this._modalUploadService.notificacion.subscribe((x) => {
      const updatedMedico = <Medico>x.medico;
      this.medico.img = updatedMedico.img;
    });
  }

  guardarMedico(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.medico._id) {
      this._medicoService.actualizarMedico(this.medico).subscribe((x) => {
        swalInLine('¡Éxito!', `Èl médico ${x.nombre} fue actualizado correctamente.`, 'success');
      });
    } else {
      this._medicoService.guardarMedico(this.medico).subscribe((x) => {
        swalInLine('¡Éxito!', `El médico ${x.nombre} fue guardado correctamente.`, 'success');
        this._router.navigate(['/medico', x._id]);
      });
    }
  }
}
