import { URL_SERVICIOS } from './../config/config';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
  private readonly baseURL = URL_SERVICIOS + '/img';
  transform(img: string, tipo: string = 'usuario'): any {
    // Si no recibo nada, devuelvo default.
    if (!img) {
      return this.baseURL + '/usuarios/default';
    }

    // Si la imagen es https (es de google) la devuelvo.
    if (img.startsWith('https://')) {
      return img;
    }

    // TIPOS
    switch (tipo) {
      case 'usuario':
        return this.baseURL + '/usuarios/' + img;
      case 'medico':
        return this.baseURL + '/medicos/' + img;
      case 'hospital':
        return this.baseURL + '/hospitales/' + img;
      default:
        console.error('Tipo de imagen no existe.', 'usuarios, médicos, hospitales');
        return this.baseURL + '/usuarios/default';
    }
  }
}
