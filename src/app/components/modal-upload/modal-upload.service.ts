import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {
  public tipo: string;
  public id: string;
  public visible: boolean = false;

  public notificacion: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ocultarModal(): void {
    this.visible = false;
    this.tipo = null;
    this.id = null;
  }

  mostrarModal(tipo: 'usuarios' | 'hospitales' | 'medicos', id: string): void {
    this.visible = true;
    this.tipo = tipo;
    this.id = id;
  }
}
