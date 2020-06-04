import { SideBarMenu } from './../../models/SideBarMenu.model';
import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class SidebarService {
  menu: SideBarMenu[];
  constructor(private _usuarioService: UsuarioService) {}
  cargarMenu() {
    this.menu = this._usuarioService.menu;
  }
}
