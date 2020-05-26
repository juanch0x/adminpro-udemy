import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { XhrFactory } from '@angular/common/http';

@Injectable()
export class ArchivoService {
  constructor() {}
  subirArchivo(archivo: File, tipo: string, id: string) {
    const url = `${URL_SERVICIOS}/upload/${tipo}/${id}`;

    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();
      formData.append('imagen', archivo, archivo.name);
      xhr.onreadystatechange = () => {
        // sólo valido que haya terminado, sino lo puedo usar para hacer un loader
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('imágen subida');
            resolve(JSON.parse(xhr.response));
          } else {
            console.error('Falló la subida de imágen.', xhr.response);
            reject(xhr.response);
          }
        }
      };

      xhr.open('PUT', url, true);
      xhr.send(formData);
    });
  }
}
