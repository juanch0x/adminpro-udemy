import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SettingsService, SharedService, SidebarService, UsuarioService, LoginGuardGuard, ArchivoService } from './service.index';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [SettingsService, SharedService, SidebarService, UsuarioService, LoginGuardGuard, ArchivoService],
  declarations: []
})
export class ServiceModule {}
