export interface SideBarMenu {
  titulo: string;
  icono: string;
  submenu: SideBarSubMenu[];
}

export interface SideBarSubMenu {
  titulo: string;
  url: string;
}