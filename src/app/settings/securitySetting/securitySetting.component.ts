import { Component } from '@angular/core';

@Component({
  selector: 'app-security-setting',
  templateUrl: './securitySetting.component.html',
  styleUrls: ['./securitySetting.component.css']
})
export class SecuritySettingComponent {
  //display key group for roles management
  supportDisplayKey:boolean=true;
  vendorDisplayKey:boolean=true;
  hostDisplayKey:boolean=true;
  adminDisplayKey:boolean=true;
  superAdminDisplayKey:boolean=true;
  //display key group ends
}
