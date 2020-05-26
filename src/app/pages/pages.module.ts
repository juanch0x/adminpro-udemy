import { PipesModule } from './../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [DashboardComponent, ProgressComponent, Graficas1Component, PagesComponent, IncrementadorComponent, AccountSettingsComponent, PromesasComponent, ProfileComponent],
  exports: [DashboardComponent, ProgressComponent, Graficas1Component, PagesComponent],
  imports: [SharedModule, PAGES_ROUTES, FormsModule, PipesModule]
})
export class PagesModule {}
