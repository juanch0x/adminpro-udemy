// Clase usada para hacer más sencilla la importación de sweet alerts.
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';

export const swal = _swal as any;

export interface SwalOptions {
  title: string;
  text: string;
  icon: 'warning' | 'error' | 'success' | 'info';
  button?: string;
}
