import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {
  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default',
  };

  private readonly localStorageKey: string = 'ajustes';

  constructor() {}

  guardarAjustes(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.ajustes));
  }

  cargarAjustes(): void {
    const data = localStorage.getItem(this.localStorageKey);
    if (data !== null) {
      this.ajustes = JSON.parse(data);
      document.getElementById('tema').setAttribute('href', this.ajustes.temaUrl);
    }
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
