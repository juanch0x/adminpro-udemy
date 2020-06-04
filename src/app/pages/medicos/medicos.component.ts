import { MedicoService } from './../../services/medico/medico.service';
import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { swalInLine } from '../../extensions/swal';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos: Medico[];
  desde: number = 0;
  filtered: boolean = false;
  get total(): number {
    return this._medicoService.total || 0;
  }
  constructor(private _medicoService: MedicoService) {}
  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicoService.cargarMedicos(this.desde).subscribe((x) => {
      this.medicos = x;
    });
  }


  borrarMedico(id: string) {
    this._medicoService.eliminarMedico(id).subscribe(() => {
      swalInLine('¡Éxito!', 'El médico fué eliminado correctamente,', 'info');
      this.cargarMedicos();
    });
  }
  
  filterChanged(term: string) {
    if (term == null || term.length < 3) {
      if (this.filtered) {
        this.filtered = false;
        this.cargarMedicos();
      }
      return;
    }
    this._medicoService.filtrarMedicos(term).subscribe((x) => {
      this.medicos = x;
      this.filtered = true;
    });
  }

}
