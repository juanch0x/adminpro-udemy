import { Component, OnInit } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
})
export class AccountSettingsComponent implements OnInit {
  private readonly BASE_PATH: string = 'assets/css/colors/{path}.css';

  constructor(private _settingsService: SettingsService) {}

  ngOnInit() {}

  cambiarEstilo(style: string): void {
    const urlStyle = this.BASE_PATH.replace('{path}', style);
    document.getElementById('tema').setAttribute('href', urlStyle);
    // elimino todos los que tienen el tilde
    const selectors: any = document.querySelectorAll('.selector');
    selectors.forEach((x) => {
      if (x.dataset.theme != style) {
        x.classList.remove('working');
      } else {
        x.classList.add('working');
      }
    });

    this._settingsService.ajustes.temaUrl = urlStyle;
    this._settingsService.ajustes.tema = style;
    this._settingsService.guardarAjustes();
  }
}
