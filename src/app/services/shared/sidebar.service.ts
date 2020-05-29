import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {
  menu: SideBarMenu[] = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'Progress', url: '/progress' },
        { titulo: 'Gráficas', url: '/graficas1' },
        { titulo: 'Promesas', url: '/promesas' }
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: '/usuarios' },
        { titulo: 'Hospitales', url: '/hospitales' },
        { titulo: 'Medicos', url: '/medicos' }
      ]
    }
  ];

  constructor() {}
}

interface SideBarMenu {
  titulo: string;
  icono: string;
  submenu: SideBarSubMenu[];
}

interface SideBarSubMenu {
  titulo: string;
  url: string;
}
