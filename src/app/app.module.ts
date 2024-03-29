import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EarningsComponent } from './earnings/earnings.component';
import {BookingComponent} from "./booking/booking.component"
import { PaymentsComponent } from './payments/payments.component';
import { SettlementsComponent } from './settlements/settlements.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { SupportStatusComponent } from './supportStatus/supportStatus.component';
import { SublevelMenuComponent } from './sidenav/sublevel-menu.component';
import { HeaderComponent } from './header/header.component';
import { RestrictedAccessComponent } from './manageStation/restrictedAccess/restricted-access.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ProfileComponent } from './profile/profile.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {NgModel,NgForm} from '@angular/forms';
import { BankDetailsComponent } from './bankDetails/bankDetails.component';
import {HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { ManageStationComponent } from './manageStation/manageStation.component';
import { AddStationComponent } from './manageStation/addStation/addStation.component';
import { OpenDialogComponent } from './manageStation/openDialog/openDialog.component';
import { ChargersComponent } from './chargers/chargers.component';
import { AddChargerComponent } from './chargers/addCharger/addCharger.component';
import { ChargerSettingComponent } from './chargers/chargerSetting/charger-setting.component';
import { DeleteDialogComponent } from './chargers/deleteDialog/delete-dialog.component';
import { ConnectorsComponent } from './connectors/connectors.component';
import { DeleteConnectorComponent } from './connectors/delete-connector/delete-connector.component';
import { AddConnectorComponent } from './connectors/add-connector/add-connector.component';
import { MatIconModule } from '@angular/material/icon';
import { ControlAccessComponent } from './manageStation/controlAccess/control-access.component';
import { SearchPipe } from './chargers/search.pipe';
import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
import { LiveDataComponent } from './dashboard/live-data/live-data.component';
import { PieChartComponent } from './dashboard/pie-chart/pie-chart.component';
import { MultiChartComponent } from './dashboard/multi-chart/multi-chart.component';
import { MatButtonModule } from '@angular/material/button';
import { NotificationDialogComponent } from './header/notification-dialog/notification-dialog.component';
import { MatBadgeModule } from '@angular/material/badge';
import { ChargingSessionComponent } from './dashboard/charging-session/charging-session.component';
import { NotificationComponent } from './notification/notification.component';
import { AddNotificationComponent } from './notification/add-notification/add-notification.component';
import { DeleteNotificationComponent } from './notification/delete-notification/delete-notification.component';
import {  AngularEditorModule } from '@kolkov/angular-editor';
import { ManageFaqComponent } from './manage-faq/manage-faq.component';
import { AddFaqDailogComponent } from './manage-faq/add-faq-dailog/add-faq-dailog.component';
import { DeleteFaqComponent } from './manage-faq/delete-faq/delete-faq.component';
import { ViewFaqDetailsComponent } from './manage-faq/view-faq-details/view-faq-details.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { AddVehicleComponent } from './vehicle/add-vehicle/add-vehicle.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { AddUserComponent } from './manage-user/add-user/add-user.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;



@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    EarningsComponent,
    BookingComponent,
    PaymentsComponent,
    SettlementsComponent,
    DownloadsComponent,
    SupportStatusComponent,
    SublevelMenuComponent,
    HeaderComponent,
    ProfileComponent,
    BankDetailsComponent,
    ManageStationComponent,
    AddStationComponent,
    OpenDialogComponent,
    ChargersComponent,
    AddChargerComponent,
    ChargerSettingComponent,
    DeleteDialogComponent,
    ConnectorsComponent,
    DeleteConnectorComponent,
    ControlAccessComponent,
    AddConnectorComponent,
    SearchPipe,
    CanvasJSChart,
    LiveDataComponent,
    PieChartComponent,
    MultiChartComponent,
    RestrictedAccessComponent,
    NotificationDialogComponent,
    ChargingSessionComponent,
    NotificationComponent,
    AddNotificationComponent,
    DeleteNotificationComponent,
    ManageFaqComponent,
    AddFaqDailogComponent,
    DeleteFaqComponent,
    ViewFaqDetailsComponent,
    VehicleComponent,
    AddVehicleComponent,
    ManageUserComponent,
    AddUserComponent,
    LoginComponent,
    SignupComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSelectModule,
    MatMenuModule,
    MatCardModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    MatPaginatorModule,
    MatRadioModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    NgxMaterialTimepickerModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
   MatButtonModule,
   FlexLayoutModule,
   NgxMatSelectSearchModule,
   MatAutocompleteModule,
   AngularEditorModule,
   FormsModule,
   FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[ViewFaqDetailsComponent]
})
export class AppModule { }
