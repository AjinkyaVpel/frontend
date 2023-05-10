import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingsComponent } from './settings.component';
import { SecuritySettingComponent } from './securitySetting/securitySetting.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { PaymentSettingComponent } from './paymentSetting/paymentSetting.component';
import { NotificationSettingComponent } from './notificationSetting/notificationSetting.component';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SettingsComponent,
    SecuritySettingComponent,
    PaymentSettingComponent,
    NotificationSettingComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    MatSlideToggleModule,
    MatIconModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SettingModule { }
