import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-setting',
  templateUrl: './paymentSetting.component.html',
  styleUrls: ['./paymentSetting.component.css']
})
export class PaymentSettingComponent {
  //display key group for roles management
  supportDisplayKey:boolean=true;
  vendorDisplayKey:boolean=true;
  hostDisplayKey:boolean=true;
  adminDisplayKey:boolean=true;
  superAdminDisplayKey:boolean=true;
  //display key group ends



  signup(){}
}
