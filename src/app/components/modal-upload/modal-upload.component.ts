import { ModalUploadService } from './modal-upload.service';
import { ArchivoService } from './../../services/archivo/archivo.service';
import { Component, OnInit } from '@angular/core';
import { swalInLine } from '../../extensions/swal';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  // visible: boolean = true;

  public get visible() {
    return this._modalUploadService.visible;
  }

  public set visible(value: boolean) {
    this._modalUploadService.visible = value;
  }

  imagenSubir: File;
  // Imagen que se mostrará a modo de vista previa de la nueva (antes de subirla.)
  imagenTemp: any;

  constructor(private _archivoService: ArchivoService, public _modalUploadService: ModalUploadService) {}

  ngOnInit() {}

  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemp = null;
    this._modalUploadService.ocultarModal();
  }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    // valido que sea una imágen.
    if (archivo.type.indexOf('image') === -1) {
      swalInLine('¡Error', `El tipo de archivo ${archivo.type} no es soportado.\n Sólo se aceptan imagenes.`, 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onloadend = () => (this.imagenTemp = reader.result);

  }

  subirImagen() {
    this._archivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
      .then(x => {
        this._modalUploadService.notificacion.emit(x);
        this.cerrarModal();
      })
      .catch(error => {
        console.error('Error en la carga', error)
      });
  }
}
