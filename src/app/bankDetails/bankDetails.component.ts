import { Component } from '@angular/core';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bankDetails.component.html',
  styleUrls: ['./bankDetails.component.css']
})
export class BankDetailsComponent {
  //display key group for roles management
  supportDisplayKey:boolean=true;
  vendorDisplayKey:boolean=true;
  hostDisplayKey:boolean=true;
  adminDisplayKey:boolean=true;
  superAdminDisplayKey:boolean=true;
  //display key group ends
}
