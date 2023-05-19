import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageStationRoutingModule } from './manage-station-routing.module';
import { ControlAccessComponent } from './controlAccess/control-access.component';
import { RestrictedAccessComponent } from './restrictedAccess/restricted-access.component';


@NgModule({
  declarations: [
    ControlAccessComponent,
    RestrictedAccessComponent
  ],
  imports: [
    CommonModule,
    ManageStationRoutingModule
  ]
})
export class ManageStationModule { }
