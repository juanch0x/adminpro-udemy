import { Component, OnInit } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
})
export class AccountSettingsComponent implements OnInit {

  constructor(private _settingsService: SettingsService) {}

  ngOnInit() {
    this.setCheck(this._settingsService.ajustes.tema);
  }

  cambiarEstilo(style: string): void {
    this.setCheck(style);
    const urlStyle = this._settingsService.crearUrl(style);
    document.getElementById('tema').setAttribute('href', urlStyle);
    // elimino todos los que tienen el tilde
    this._settingsService.ajustes.temaUrl = urlStyle;
    this._settingsService.ajustes.tema = style;
    this._settingsService.guardarAjustes();
  }

  setCheck(style: string): void {
    const selectors: any = document.querySelectorAll('.selector');
    selectors.forEach((x) => {
      if (x.dataset.theme !== style) {
        x.classList.remove('working');
      } else {
        x.classList.add('working');
      }
    });
  }

}
