import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageStationRoutingModule } from './manage-station-routing.module';
import { ControlAccessComponent } from './control-access/control-access.component';


@NgModule({
  declarations: [
    ControlAccessComponent
  ],
  imports: [
    CommonModule,
    ManageStationRoutingModule
  ]
})
export class ManageStationModule { }
