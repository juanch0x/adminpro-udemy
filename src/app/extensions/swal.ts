// Clase usada para hacer más sencilla la importación de sweet alerts.
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';

const swalHelper = _swal as any;
/**
 * Método para disparar un sweetalert de manera convencional.
 * @param parameters Parámetros obligatorios para disparar un sweetalert.
 */
export function swal(parameters: SwalOptions) {
  swalHelper(parameters);
}

/**
 * Método para disparar un sweetalert en una línea.
 * @param title Título de la ventana de SweetAlert
 * @param text Texto de la ventana de SweetAlert
 * @param icon Ícono de la ventana de SweetAlert
 */
export function swalInLine(title: string, text: string, icon: 'warning' | 'error' | 'success' | 'info') {
  swalHelper(title, text, icon);
}

export interface SwalOptions {
  title: string;
  text: string;
  icon: 'warning' | 'error' | 'success' | 'info';
  button?: string;
}
