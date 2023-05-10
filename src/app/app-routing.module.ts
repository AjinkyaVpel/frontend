import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaymentsComponent } from './payments/payments.component';
import { ProfileComponent } from './profile/profile.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { BookingComponent, } from './booking/booking.component';
import { SettingModule } from './settings/setting.module';
import { SettingsComponent } from './settings/settings.component';
import { SettlementsComponent } from './settlements/settlements.component';
import { SupportStatusComponent } from './supportStatus/supportStatus.component';
import { EarningsComponent } from './earnings/earnings.component';
import { BankDetailsComponent } from './bankDetails/bankDetails.component';
import { ManageStationComponent } from './manageStation/manageStation.component';
import { ChargersComponent } from './chargers/chargers.component';
import { ChargerSettingComponent } from './chargers/chargerSetting/charger-setting.component';
import { ConnectorsComponent } from './connectors/connectors.component';
import { ControlAccessComponent } from './manageStation/controlAccess/control-access.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path:'dashboard',
    component: DashboardComponent
  },
  {
    path:'profile',
    component: ProfileComponent
  },
  {
    path:'bankDetails',
    component: BankDetailsComponent
  },
  {
    path:'manageStation',
    component: ManageStationComponent
  },
  {
    path:'manageStation/chargers/:stationId',
    component: ChargersComponent
  },
  {
    path:'manageStation/chargers/:stationId/chargerSetting/:chargerId',
    component: ChargerSettingComponent,
  },
  {
    path:'manageStation/chargers/:stationId/connector/:chargerId',
    component: ConnectorsComponent,
  },
  {
    path: 'manageStation/controlAccess/:id',
    component: ControlAccessComponent
  },
  {
    path:'earnings',
    component: EarningsComponent
  },
  {
    path:'booking',
    component:BookingComponent
  },
  {
    path:'payments',
    component: PaymentsComponent
  },
  {
    path:'settlements',
    component: SettlementsComponent
  },
  {
    path:'downloads',
    component: DownloadsComponent
  },
  {
    path:'support-status',
    component: SupportStatusComponent
  },
  {
    path:'settings',
    loadChildren: () => import('./settings/setting.module').then(m => m.SettingModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
