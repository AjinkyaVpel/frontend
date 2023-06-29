import { Component } from '@angular/core';

@Component({
  selector: 'app-notification-setting',
  templateUrl: './notificationSetting.component.html',
  styleUrls: ['./notificationSetting.component.css']
})
export class NotificationSettingComponent {
  //display key group for roles management
  supportDisplayKey:boolean=true;
  vendorDisplayKey:boolean=true;
  hostDisplayKey:boolean=true;
  adminDisplayKey:boolean=true;
  superAdminDisplayKey:boolean=true;
  //display key group ends
}
