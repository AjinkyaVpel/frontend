import { Component } from '@angular/core';

@Component({
  selector: 'app-charging-session',
  templateUrl: './charging-session.component.html',
  styleUrls: ['./charging-session.component.css']
})
export class ChargingSessionComponent {
    //display key group for roles management
    supportDisplayKey:boolean=true;
    vendorDisplayKey:boolean=true;
    hostDisplayKey:boolean=true;
    adminDisplayKey:boolean=true;
    superAdminDisplayKey:boolean=true;
    //display key group ends
dataSource:any;
}
