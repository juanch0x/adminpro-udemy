import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SettingsService, SharedService, SidebarService, UsuarioService, LoginGuardGuard } from './service.index';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [SettingsService, SharedService, SidebarService, UsuarioService, LoginGuardGuard],
  declarations: [],
})
export class ServiceModule {}
