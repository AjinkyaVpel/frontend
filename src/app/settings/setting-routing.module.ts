import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationSettingComponent } from './notificationSetting/notificationSetting.component';
import { PaymentSettingComponent } from './paymentSetting/paymentSetting.component';
import { SecuritySettingComponent } from './securitySetting/securitySetting.component';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: 'accountSetting',
    component: SettingsComponent
  },
  {
    path: 'securitySetting',
    component: SecuritySettingComponent
  },
  {
    path: 'paymentSetting',
    component: PaymentSettingComponent
  },
  {
    path: 'notificationSetting',
    component: NotificationSettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
